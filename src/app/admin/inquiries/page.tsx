import { prisma } from '@/lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import InquiryClient from './InquiryClient';

export default async function AdminInquiriesPage() {
  const session = await getServerSession(authOptions);
  
  // ★ consultationRequest 로 수정
  const rawInquiries = await prisma.consultationRequest.findMany({
    orderBy: { createdAt: 'desc' }, // 스키마의 필드명에 맞춰 createdAt으로 수정
  });

  const initialInquiries = rawInquiries.map((item) => {
    const dateObj = new Date(item.createdAt); // createdAt 사용
    const formattedDate = !isNaN(dateObj.getTime())
      ? `${dateObj.getFullYear()}. ${dateObj.getMonth() + 1}. ${dateObj.getDate()}.`
      : '';

    return {
      id: item.id,
      name: item.name,
      phone: item.phone,
      ip_address: item.ip,
      date: formattedDate,
    };
  });

  return <InquiryClient initialInquiries={initialInquiries} />;
}