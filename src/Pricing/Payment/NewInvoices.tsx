import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import axiosInstance from "@/config/axiosConfig";
import { usePricingState } from "@/context/pricing";
import { Icons } from "@/components/icons";
const NewInvoices = () => {
  const [clicked, setClicked] = useState(false);
  const [changelogInvoices, setChangelogInvoices] = useState([]);
  const [npsInvoices, setNpsInvoices] = useState([]);
  const [feedbackInvoices, setFeedbackInvoices] = useState([]);
  const { selectedProduct } = usePricingState();

  let filteredInvoices: any = [];
  const baseURL = "https://353eb462-a317-4fa2-9a97-d1e5cae195e3.mock.pstmn.io";
  useEffect(() => {
    async function fetchInvoices() {
      try {
        const changelogResponse = await axiosInstance.get(
          `${baseURL}/invoices`
        );
        setChangelogInvoices(changelogResponse.data);

        const npsResponse = await axiosInstance.get(
          `${baseURL}/invoices?nps=true`
        );
        setNpsInvoices(npsResponse.data);

        const feedbackResponse = await axiosInstance.get(
          `${baseURL}/invoices?feedback=true`
        );
        setFeedbackInvoices(feedbackResponse.data);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    }
    fetchInvoices();
  }, []);

  if (selectedProduct === "changelog") {
    filteredInvoices = changelogInvoices;
  } else if (selectedProduct === "nps") {
    filteredInvoices = npsInvoices;
  } else if (selectedProduct === "feedback") {
    filteredInvoices = feedbackInvoices;
  }

  return (
    <div className="w-5/6 mt-8 ">
      {filteredInvoices.length > 0 ? (
        <>
          <Table className="">
            <TableBody>
              {filteredInvoices
                .slice(0, clicked ? filteredInvoices.length : 10)
                .map((invoice: any, index: number) => (
                  <TableRow
                    key={index}
                    className={`h-[50px] hover:bg-0  ${
                      index % 2 !== 0 ? "bg-slate-50" : "bg-white"
                    }`}
                  >
                    <TableCell className="font-medium text-base ">
                      {invoice.date}
                    </TableCell>
                    <TableCell className="font-medium text-base">
                      {invoice.plan}
                    </TableCell>
                    <TableCell className="font-medium text-base text-right">
                      <a
                        href={invoice.url}
                        className="text-authBlue cursor-pointer"
                      >
                        Download
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          {filteredInvoices.length > 5 && (
            <div className="flex justify-center items-center mt-4">
              {!clicked && filteredInvoices.length > 10 && (
                <Button
                  className="text-center text-md text-authBlue bg-white hover:bg-white shadow-none hover:underline hover:underline-offset-4 disableBorder"
                  onClick={() => setClicked(!clicked)}
                >
                  See more
                </Button>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center h-12  bg-[#D9E1E9] mt-6 rounded-sm bg">
          <div className=" flex justify-center gap-3 ml-5">
            <Icons.threeDots />
            <p>No invoices yet!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewInvoices;
