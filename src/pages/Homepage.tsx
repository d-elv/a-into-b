import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { useEffect, useState } from "react";
import { formatNumber } from "@/lib/formatters";
import { ArrowLeftRight } from "lucide-react";

import { Combobox } from "@/components/ui/combobox";

export type worldlyObject = {
  name: string;
  volume: string;
};

const vowelRegex = /[aeiou]/i;

export const Homepage = () => {
  const [data, setData] = useState<worldlyObject[]>();
  const [leftSideObject, setLeftSideObject] = useState<worldlyObject | null>(
    null
  );
  const [rightSideObject, setRightSideObject] = useState<worldlyObject | null>(
    null
  );
  const [leftIntoRightResult, setLeftIntoRightResult] = useState(0);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    leftToRightMaths();
  }, [leftSideObject, rightSideObject]);

  const getData = async () => {
    const options = {
      method: "GET",
      url: "https://uc-api.chrisguy.me/objects",
    };

    try {
      const { data } = await axios.request(options);
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleValueChangeLHS = (selectedValue: worldlyObject) => {
    setLeftSideObject(selectedValue);
  };
  const handleValueChangeRHS = (selectedValue: worldlyObject) => {
    setRightSideObject(selectedValue);
  };

  const swapValues = () => {
    const temporaryLeftSide = leftSideObject;
    const temporaryRightSide = rightSideObject;
    setLeftSideObject(temporaryRightSide);
    setRightSideObject(temporaryLeftSide);
    leftToRightMaths();
  };

  const leftToRightMaths = () => {
    if (leftSideObject && rightSideObject) {
      const newResult = Math.round(
        ((Number(rightSideObject.volume) / Number(leftSideObject.volume)) *
          100) /
          100
      );
      setLeftIntoRightResult(newResult);
    }
  };

  const leftToRightMessageCalculator = () => {
    // not sure if I like this but it removes the logic from the jsx
    if (leftSideObject && rightSideObject) {
      if (
        leftIntoRightResult !== 1 &&
        vowelRegex.test(rightSideObject.name.slice(0, 1))
      ) {
        return `${formatNumber(leftIntoRightResult)} ${
          leftSideObject.name
        }s fit into an ${rightSideObject.name}`;
      }
      if (leftIntoRightResult !== 1) {
        return `${formatNumber(leftIntoRightResult)} ${
          leftSideObject.name
        }s fit into a ${rightSideObject.name}`;
      }
      if (vowelRegex.test(rightSideObject.name.slice(0, 1))) {
        return `${formatNumber(leftIntoRightResult)} ${
          leftSideObject.name
        } fits into an ${rightSideObject.name}`;
      } else {
        return `${formatNumber(leftIntoRightResult)} ${
          leftSideObject.name
        } fits into a ${rightSideObject.name}`;
      }
    }
    return "";
  };

  return (
    <div className="">
      <header className="mb-3">
        <h1 className="text-2xl font-bold text-yellow-700">Compare Yourself</h1>
      </header>
      <section className="mb-10">
        <div className="flex justify-around mx-auto">
          <div className="flex flex-col items-start">
            <label htmlFor="combobox-left">How many...</label>
            <Combobox
              data={data || null}
              onValueChange={handleValueChangeLHS}
              selectedValue={leftSideObject}
            />
          </div>
          <button className="self-end" onClick={swapValues}>
            <ArrowLeftRight />
          </button>
          <div className="flex flex-col items-start">
            <label htmlFor="combobox-right">
              Fit into{" "}
              {rightSideObject &&
              vowelRegex.test(rightSideObject.name.slice(0, 1))
                ? "an"
                : "a"}
              ?
            </label>
            <Combobox
              data={data || null}
              onValueChange={handleValueChangeRHS}
              selectedValue={rightSideObject}
            />
          </div>
        </div>
        <p
          className={`mt-5 text-xl rounded-xl ${
            leftSideObject && rightSideObject ? "bg-yellow-500" : ""
          } w-fit mx-auto pl-3 pr-3 pt-1 pb-1`}
        >
          {leftToRightMessageCalculator()}
        </p>
      </section>
      <section className="mt-2">
        <Table className="w-96 mx-auto">
          <TableCaption>Data to compare</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-0.5 text-xl">Name</TableHead>
              <TableHead className="w-0.5 text-xl">Volume</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data && data.length > 0 ? (
              data.map((item: worldlyObject, index: number) => (
                <TableRow key={index}>
                  <TableCell className="text-left">{item.name}</TableCell>
                  <TableCell className="text-left">
                    {formatNumber(Number(item.volume))}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2}>All available data</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </section>
    </div>
  );
};
