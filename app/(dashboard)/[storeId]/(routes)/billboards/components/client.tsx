"use client";

import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { BillBoardColumns, columns } from "./columns";
import ApiList from "@/components/api-list";

interface BillboardClientProps {
  data: BillBoardColumns[];
}

export default function BillBoardClient({ data }: BillboardClientProps) {
  const params = useParams();
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${data.length})`}
          description="Manage billboards for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <Plus className="h-4 w-4 mr-2" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="label" columns={columns} data={data} />

      <Heading title="API" description="API calls for billboards" />
      <Separator />
      <ApiList entityName="billboards" entityNameId="billboardId" />
    </>
  );
}
