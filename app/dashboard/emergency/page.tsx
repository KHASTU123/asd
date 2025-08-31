import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { EmergencyContacts } from "@/components/dashboard/emergency-contacts"

export default function EmergencyPage() {
  return (
    <DashboardLayout>
      <EmergencyContacts />
    </DashboardLayout>
  )
}
