<script lang="ts">
	import DashboardCard from "$lib/components/dashboard-card.svelte";
	import { TruckOutline } from "flowbite-svelte-icons";
  import type { ApexOptions } from "apexcharts";
  import { Chart } from "@flowbite-svelte-plugins/chart";
  import { Card, Button, P, Modal} from "flowbite-svelte";

  let transaction = {
    order: '10.000',
    income: 'Rp123.421.000',
    newCustomer: '23',
    refund: '1',
  }

  let announces = [
    {
      title: 'Memo Gudang',
      message: 'Tolong nanti kalau ada pak ilham, diambil barangnya ya',
      sender: 'Ko Aliong',
    },
    {
      title: 'Memo Akuntan',
      message: 'Jangan lupa pajak sudah turun ya',
      sender: 'Ci Sana',
    },
    {
      title: 'Memo Internal',
      message: 'Besok masuk lebih awal 10 menit ya',
      sender: 'Pak Sudi',
    }
  ];

  let whoOpenId = $state('');

  let weeklyOrder = [12126, 11235, 9632, 9852, 10120, 10000, 12332]

  let options: ApexOptions = {
    chart: {
      height: 200,
      type: "area",
      fontFamily: "Inter, sans-serif",
      dropShadow: {
        enabled: false
      },
      toolbar: {
        show: false
      }
    },
    tooltip: {
      enabled: true,
      x: {
        show: false
      }
    },
    series: [
      {
        name: "Daily orders",
        data: weeklyOrder,
        color: "#1A56DB"
      }
    ]
  };
</script>

<head><title>Insert Dashboard</title></head>


<div class="flex flex-row p-2">
  <!-- Dashboard, left section[card of information] -->
  <div class="flex flex-col w-[30%] p-2 gap-2">
    <div class="bg-green-400/50 flex flex-col gap-1 justify-center rounded-xl">
      <span class=" text-center">Performance Overview</span>
      <DashboardCard spanClass="text-sky-600 font-bold" background="hover:bg-green-500/40 bg-green-400/30 backdrop-blur-[6.1px] border border-white/30" iconBg="bg-white/30  border border-white/30" icon={TruckOutline} data={transaction.order} text="Orders within a day!"/>
    </div>
    <DashboardCard spanClass="text-sky-600 font-bold" background="hover:bg-blue-500/40 bg-blue-400/30 backdrop-blur-[6.1px] border border-white/30" iconBg="bg-white/30  border border-white/30" icon={TruckOutline} data={transaction.income} text="Total income today."/>
    <DashboardCard spanClass="text-sky-600 font-bold" background="hover:bg-red-500/40 bg-red-400/30 backdrop-blur-[6.1px] border border-white/30" iconBg="bg-white/30  border border-white/30" icon={TruckOutline} data={transaction.newCustomer} text="New customers."/>
    <DashboardCard spanClass="text-sky-600 font-bold" background="hover:bg-orange-500/40 bg-orange-400/30 backdrop-blur-[6.1px] border border-white/30" iconBg="bg-white/30  border border-white/30" icon={TruckOutline} data={transaction.refund} text="Product refunded."/>
    <DashboardCard spanClass="text-sky-600 font-bold" background="hover:bg-orange-500/40 bg-orange-400/30 backdrop-blur-[6.1px] border border-white/30" iconBg="bg-white/30  border border-white/30" icon={TruckOutline} data={transaction.refund} text="Product refunded."/>
  </div>

  <div class="grid grid-cols-2 grid-rows-4 gap-4 w-[70%] p-2">
    <div class="col-span-2 row-span-2">
      <Card class="p-2 md:p-4 max-w-none! bg-linear-to-br from-indigo-400/70 via-gray-700/60 to-orange-700/60  backdrop-blur-[6.1px] border border-white/30">
        <Chart class="w-full " bind:options />
      </Card>
    </div>
    <div class="row-span-2 row-start-3">
      <Card class="p-2 md:p-4 max-w-none! bg-linear-to-br from-indigo-400/70 via-gray-700/60 to-orange-700/60 backdrop-blur-[6.1px] border border-white/30">
        <span>Role Memo</span>
        {#each announces as announce}
          <Button class="cursor-pointer !bg-gray-300/30 !bg-linear-to-r from-indigo-800/40 via-gray-700/30 to-orange-700/30 backdrop-blur-[6.1px] hover:brightness-90 border border-gray-800/40 m-1" onclick={() => (whoOpenId = announce.title)}>{announce.title}</Button>
          <Modal title={announce.title} open={whoOpenId === announce.title}>
          <P>{announce.message}</P>
          <P>{announce.sender}</P>
        </Modal>
        {/each }
      </Card>
    </div>
    <div class="row-span-2 row-start-3">
      <Card class="p-2 md:p-4 max-w-none! bg-linear-to-bl from-indigo-400/70 via-gray-700/60 to-orange-700/60  backdrop-blur-[6.1px] border border-white/30">
        <span>General Memo</span>
        {#each announces as announce}
          <Button class="cursor-pointer !bg-gray-300/30 !bg-linear-to-l from-indigo-800/40 via-gray-700/30 to-orange-700/30 backdrop-blur-[6.1px] hover:brightness-90 border border-gray-800/40 m-1" onclick={() => (whoOpenId = announce.title)}>{announce.title}</Button>
          <Modal title={announce.title} open={whoOpenId === announce.title}>
          <P>{announce.message}</P>
          <P>{announce.sender}</P>
        </Modal>
        {/each }
      </Card>
    </div>
  </div>

</div>