import React, { useEffect, useState } from "react";
import { fetchPartners } from "../../../features/landingpage/partners/services/partner_service";
import type { Partner } from "../../../features/landingpage/partners/Partner";
import defaultImg from "../../../assets/img/logo/get-skill/Asset 4.png";

const MitraCarousel: React.FC = () => {
      const [partners, setPartners] = useState<Partner[]>([]);
      const [errorImages, setErrorImages] = useState<{ [key: number]: boolean }>({});

      useEffect(() => {
            const loadPartners = async () => {
                  const data = await fetchPartners();
                  setPartners(data);
            };
            loadPartners();
      }, []);

      const handleImageError = (index: number, e: React.SyntheticEvent<HTMLImageElement>) => {
            e.currentTarget.src = defaultImg;
            setErrorImages((prev) => ({ ...prev, [index]: true }));
      };

      return (
            <div className="relative w-full overflow-hidden">
                  {/* Gradient overlay dengan inline style */}
                  <div
                        className="gradient-overlay-left"
                        style={{
                              background: "var(--gradient-overlay-left)",
                        }}
                  ></div>
                  <div
                        className="gradient-overlay-right"
                        style={{
                              background: "var(--gradient-overlay-right)",
                        }}
                  ></div>

                  {/* Fallback untuk dark mode */}
                  <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-[#141427] to-transparent z-10 dark:block hidden pointer-events-none"></div>
                  <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-[#141427] to-transparent z-10 dark:block hidden pointer-events-none"></div>

                  <div className="flex animate-marquee whitespace-nowrap">
                        {partners.map((partner, index) => (
                              <div
                                    key={`track1-${partner.id || index}`}
                                    className="marquee-item flex-shrink-0 flex items-center justify-center h-45"
                              >
                                    <img
                                          src={partner.photo || defaultImg}
                                          alt={partner.name}
                                          onError={(e) => handleImageError(index, e)}
                                          className={`object-contain dark:shadow-none ${errorImages[index]
                                                ? "max-h-24 opacity-80"
                                                : "max-h-full"
                                                }`}
                                    />
                              </div>
                        ))}

                        {partners.map((partner, index) => (
                              <div
                                    key={`track2-${partner.id || index}`}
                                    className="marquee-item flex-shrink-0 flex items-center justify-center h-45"
                              >
                                    <img
                                          src={partner.photo || defaultImg}
                                          alt={partner.name}
                                          onError={(e) => handleImageError(index + partners.length, e)}
                                          className={`object-contain dark:shadow-none ${errorImages[index + partners.length]
                                                ? "max-h-16 opacity-80"
                                                : "max-h-full"
                                                }`}
                                    />
                              </div>
                        ))}
                  </div>
            </div>
      );
};

export default MitraCarousel;
