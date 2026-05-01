"use client";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Table, { Column } from "@/components/common/Table";
import { useState } from "react";
import { format } from "date-fns";
import { MdCurrencyRupee } from "react-icons/md";

export default function PaymentRequestsClient() {
  const [searchTerm, setSearchTerm] = useState("");

  const rowData = [
    {
      id: "MH018001",
      name: "Test User",
      email: "TfUwU@example.com",
      amount: "50",
      status: "pending",
      type: "Sent",
      txnId: "234567890",
      paymentMethod: "Bank",
      reviewedBy: "-",
      createdAt: "2025-06-24 13:38:54",
    },
  ];

  const rowColumnData: Column<(typeof rowData)[0]>[] = [
    {
      accessor: "id",
      title: "sr. no",
      sortable: false,
      render: (_, index) => index + 1,
    },
    {
      accessor: "name",
      title: "name",
      sortable: false,
    },
    {
      accessor: "email",
      title: "email",
      sortable: false,
    },
    {
      accessor: "amount",
      title: "amount",
      sortable: false,
      render: (row) => (
        <span className="flex items-center">
          <MdCurrencyRupee />
          {row.amount}
        </span>
      ),
    },
    {
      accessor: "status",
      title: "status",
      sortable: false,
    },
    {
      accessor: "type",
      title: "type",
      sortable: false,
    },
    {
      accessor: "txnId",
      title: "txnId",
      sortable: false,
    },
    {
      accessor: "paymentMethod",
      title: "payment method",
      sortable: false,
    },
    {
      accessor: "reviewedBy",
      title: "reviewed by",
      sortable: false,
    },
    {
      accessor: "createdAt",
      title: "created At",
      render: (row) => format(new Date(row.createdAt), "yyyy-MM-dd HH:mm:ss"),
    },
  ];
  const filteredData = rowData.filter(
    (row) =>
      row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.amount.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.txnId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.reviewedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      format(new Date(row.createdAt), "yyyy-MM-dd HH:mm:ss").includes(
        searchTerm
      )
  );

  return (
    <>
      <PageBreadcrumb items={[{ label: "Payment Requests" }]} />
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          paymentRequestList
        </h3>       
      </div>
      <div className="space-y-6">
        <Table
          columns={rowColumnData}
          data={filteredData}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      </div>
    </>
  );
} 