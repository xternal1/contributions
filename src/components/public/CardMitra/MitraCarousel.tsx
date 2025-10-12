import React, { useEffect, useState } from "react";
import { fetchPartners } from "../../../features/landingpage/partners/services/partner_service";
import type { Partner } from "../../../features/landingpage/partners/Partner";

const MitraCarousel: React.FC = () => {
      const [partners, setPartners] = useState<Partner[]>([]);

      useEffect(() => {
            const loadPartners = async () => {
                  const data = await fetchPartners();
                  setPartners(data);
            };
            loadPartners();
      }, []);

      return (
            <div className="relative w-full overflow-hidden">
                  {/* Gradient overlay */}
                  <div className="gradient-overlay-left"></div>
                  <div className="gradient-overlay-right"></div>

                  <div className="flex animate-marquee whitespace-nowrap">
                        {partners.map((partner, index) => (
                              <div
                                    key={`track1-${partner.id || index}`}
                                    className="marquee-item flex-shrink-0 flex items-center justify-center h-45"
                              >
                                    <img
                                          src={partner.photo}
                                          alt={partner.name}
                                          className="max-h-full object-contain"
                                    />
                              </div>
                        ))}
                        {partners.map((partner, index) => (
                              <div
                                    key={`track2-${partner.id || index}`}
                                    className="marquee-item flex-shrink-0 flex items-center justify-center h-45"
                              >
                                    <img
                                          src={partner.photo}
                                          alt={partner.name}
                                          className="max-h-full object-contain"
                                    />
                              </div>
                        ))}
                  </div>
            </div>
      );
};

export default MitraCarousel;
