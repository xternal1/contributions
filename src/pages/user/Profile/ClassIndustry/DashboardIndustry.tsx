import { useState, useEffect } from "react";
import DashboardLayout from "@components/public/auth/DashboardLayout";
import { summaryCards, zoomSchedule, billingData, statisticsData } from "@/data/dummyDashboardIndustry";
import type { DashboardIndustryProps } from "@/types/Dashboard";
import { DashboardHeader, SummaryCards, ZoomSchedule } from "@/components/dashboardindustry/Index";
import BillingSection from "@/components/dashboardindustry/BilingSection";
import StatisticsSection from "@/components/dashboardindustry/StaticsSection";

const DashboardIndustry: React.FC<DashboardIndustryProps> = ({ name = "User", gender = "male" }) => {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <DashboardLayout slug="dashboardIndustri">
            <main className="space-y-6 flex-1 ml-0 2xl:ml-8 xl:ml-8 lg:ml-8">
                <DashboardHeader name={name} gender={gender} loading={loading} />
                <SummaryCards cards={summaryCards} loading={loading} />
                <BillingSection data={billingData} loading={loading} />
                <ZoomSchedule schedule={zoomSchedule} loading={loading} />
                <StatisticsSection data={statisticsData} loading={loading} />
            </main>
        </DashboardLayout>
    );
};

export default DashboardIndustry;