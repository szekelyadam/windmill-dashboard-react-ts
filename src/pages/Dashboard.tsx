import React, { useState, useEffect } from "react";

import CTA from "../components/CTA";
import InfoCard from "../components/Cards/InfoCard";
import ChartCard from "../components/Chart/ChartCard";
import { Doughnut, Line } from "react-chartjs-2";
import ChartLegend from "../components/Chart/ChartLegend";
import PageTitle from "../components/Typography/PageTitle";
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from "../icons";
import RoundIcon from "../components/RoundIcon";
import response, { TableData } from "../utils/demo/tableData";
import {
    TableBody,
    TableContainer,
    Table,
    TableHeader,
    TableCell,
    TableRow,
    TableFooter,
    Avatar,
    Badge,
    Pagination,
} from "@windmill/react-ui";

import {
    doughnutOptions,
    lineOptions,
    doughnutLegends,
    lineLegends,
} from "../utils/demo/chartsData";

function Dashboard() {
    const [page, setPage] = useState<number>(1);
    const [data, setData] = useState<Array<TableData>>([]);

    // pagination setup
    const resultsPerPage = 10;
    const totalResults = response.length;

    // pagination change control
    function onPageChange(activePage: number) {
        setPage(activePage);
    }

    // on page change, load new sliced data
    // here you would make another server request for new data
    useEffect(() => {
        setData(
            response.slice((page - 1) * resultsPerPage, page * resultsPerPage)
        );
    }, [page]);

    return (
        <>
            <PageTitle>Dashboard</PageTitle>

            <CTA />

            {/* <!-- Cards --> */}
            <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                <InfoCard title="Total clients" value="6389">
                    <RoundIcon
                        iconColorClass="text-orange-500 dark:text-orange-100"
                        bgColorClass="bg-orange-100 dark:bg-orange-500"
                        className="mr-4"
                    >
                        <PeopleIcon className="w-5 h-5" />
                    </RoundIcon>
                </InfoCard>

                <InfoCard title="Account balance" value="$ 46,760.89">
                    <RoundIcon
                        iconColorClass="text-green-500 dark:text-green-100"
                        bgColorClass="bg-green-100 dark:bg-green-500"
                        className="mr-4"
                    >
                        <MoneyIcon className="w-5 h-5" />
                    </RoundIcon>
                </InfoCard>

                <InfoCard title="New sales" value="376">
                    <RoundIcon
                        iconColorClass="text-blue-500 dark:text-blue-100"
                        bgColorClass="bg-blue-100 dark:bg-blue-500"
                        className="mr-4"
                    >
                        <CartIcon className="w-5 h-5" />
                    </RoundIcon>
                </InfoCard>

                <InfoCard title="Pending contacts" value="35">
                    <RoundIcon
                        iconColorClass="text-teal-500 dark:text-teal-100"
                        bgColorClass="bg-teal-100 dark:bg-teal-500"
                        className="mr-4"
                    >
                        <ChatIcon className="w-5 h-5" />
                    </RoundIcon>
                </InfoCard>
            </div>

            <TableContainer>
                <Table>
                    <TableHeader>
                        <tr>
                            <TableCell>Client</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Date</TableCell>
                        </tr>
                    </TableHeader>
                    <TableBody>
                        {data.map((user, i) => (
                            <TableRow key={i}>
                                <TableCell>
                                    <div className="flex items-center text-sm">
                                        <Avatar
                                            className="hidden mr-3 md:block"
                                            src={user.avatar}
                                            alt="User image"
                                        />
                                        <div>
                                            <p className="font-semibold">
                                                {user.name}
                                            </p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                                {user.job}
                                            </p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className="text-sm">
                                        $ {user.amount}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <Badge type={user.status}>
                                        {user.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <span className="text-sm">
                                        {new Date(
                                            user.date
                                        ).toLocaleDateString()}
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TableFooter>
                    <Pagination
                        totalResults={totalResults}
                        resultsPerPage={resultsPerPage}
                        label="Table navigation"
                        onChange={onPageChange}
                    />
                </TableFooter>
            </TableContainer>

            <PageTitle>Charts</PageTitle>
            <div className="grid gap-6 mb-8 md:grid-cols-2">
                <ChartCard title="Revenue">
                    <Doughnut {...doughnutOptions} />
                    <ChartLegend legends={doughnutLegends} />
                </ChartCard>

                <ChartCard title="Traffic">
                    <Line {...lineOptions} />
                    <ChartLegend legends={lineLegends} />
                </ChartCard>
            </div>
        </>
    );
}

export default Dashboard;
