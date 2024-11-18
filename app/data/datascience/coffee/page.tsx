// @ts-ignore
import SyntaxHighlighter from "react-syntax-highlighter"
// @ts-ignore
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs"
import { supabase } from "../../../utils/supabase/server"
import DownloadButton from "./downloadButton"

export default async function CoffeePage() {
  // Fetch data using Supabase RPC calls
  const { data: data1, error: error1 } = await supabase.rpc("top_export")
  const { data: data2, error: error2 } = await supabase.rpc("top_total_production")
  const { data: data3, error: error3 } = await supabase.rpc("top_five_production")
  const { data: data4, error: error4 } = await supabase.rpc("top_combined_trade")

  // SQL Query Strings for Syntax Highlighting
  const codeString01 = `
BEGIN
  RETURN (
    SELECT json_build_object(
      'country', "Country",
      'total_export', (1990 + 1991 + 1992 + 1993 + 1994)
    )
    FROM coffee
    ORDER BY (1990 + 1991 + 1992 + 1993 + 1994) DESC
    LIMIT 1
  );
END;`
  const codeString02 = `
BEGIN
  RETURN (
    SELECT jsonb_agg(
      jsonb_build_object(
        'country', "Country",
        'total_production', total_production
      )
    )
    FROM (
      SELECT "Country", 
             (COALESCE("1999/00", 0) + COALESCE("2000/01", 0) + COALESCE("2001/02", 0) + COALESCE("2002/03", 0) + COALESCE("2003/04", 0)) AS total_production
      FROM coffee_production
      ORDER BY total_production DESC
      LIMIT 5
    ) subquery
  );
END;
`
  const codeString03 = `
BEGIN
  RETURN (
    SELECT jsonb_agg(
      jsonb_build_object(
        'coffee_type', coffee_type,
        'country', "Country",
        'total_production', total_production,
        'rank', rank
      )
    )
    FROM (
      WITH total_production AS (
        SELECT 
          coffee_type,
          "Country",
          (COALESCE("1990/91", 0) + COALESCE("1991/92", 0) + COALESCE("1992/93", 0) + COALESCE("1993/94", 0) + COALESCE("1994/95", 0)) AS total_production
        FROM coffee_production
      ),
      ranked_production AS (
        SELECT 
          coffee_type,
          "Country",
          total_production,
          RANK() OVER (PARTITION BY coffee_type ORDER BY total_production DESC) AS rank
        FROM total_production
      )
      SELECT 
        coffee_type,
        "Country",
        total_production,
        rank
      FROM ranked_production
      WHERE rank <= 3
    ) subquery
  );
END;
`
  const codeString04 = `
  BEGIN
  RETURN QUERY
  SELECT 
    TRIM(BOTH FROM COALESCE(e."Country", i."Country")) AS country,
    COALESCE(
      COALESCE(e."1995", 0) + COALESCE(e."1996", 0) + COALESCE(e."1997", 0) + COALESCE(e."1998", 0) + COALESCE(e."1999", 0) + COALESCE(e."2000", 0),
      0
    ) AS total_export,
    COALESCE(
      COALESCE(i."1995", 0) + COALESCE(i."1996", 0) + COALESCE(i."1997", 0) + COALESCE(i."1998", 0) + COALESCE(i."1999", 0) + COALESCE(i."2000", 0),
      0
    ) AS total_import,
    COALESCE(
      COALESCE(e."1995", 0) + COALESCE(e."1996", 0) + COALESCE(e."1997", 0) + COALESCE(e."1998", 0) + COALESCE(e."1999", 0) + COALESCE(e."2000", 0),
      0
    ) +
    COALESCE(
      COALESCE(i."1995", 0) + COALESCE(i."1996", 0) + COALESCE(i."1997", 0) + COALESCE(i."1998", 0) + COALESCE(i."1999", 0) + COALESCE(i."2000", 0),
      0
    ) AS total_combined
  FROM coffee_export e
  FULL OUTER JOIN coffee_import i
  ON TRIM(BOTH FROM e."Country") = TRIM(BOTH FROM i."Country")
  ORDER BY total_combined DESC
  LIMIT 5;
END;
`

  return (
    <div className="container mx-auto my-2 space-y-8 rounded-lg bg-black p-6 shadow-lg">
      {/* Top Exporter (1990-1994) */}
      <div>
        <div className="space-y-4">
          <h1 className="font-mono text-4xl font-bold text-white">Data Requests:</h1>
          <hr />
          <h1 className="text-2xl font-bold">Top Exporter (1990-1994)</h1>
          <h2>
            <b>Scenario:</b> The company is looking to understand historical trends in coffee exports. <br />
            <b>Task: </b>Identify the top exporter of coffee between 1990-1994.
          </h2>

          {error1 ? (
            <div className="alert alert-error shadow-lg">
              <span>{error1.message}</span>
            </div>
          ) : (
            <div>
              <table className="table w-full rounded-lg">
                <thead>
                  <tr>
                    <th>Country</th>
                    <th>Total Export</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{data1?.country || "N/A"}</td>
                    <td>{data1?.total_export || "N/A"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Top Coffee Producers (1999/00 - 2000/01) */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Top Coffee Producers (1999-2004):</h1>
        <h2>
          <b>Scenario:</b> To plan future coffee sourcing strategies, the company needs to identify key coffee-producing
          countries. <br />
          <b>Task: </b>Find the top 3 coffee producers during the years 1999 - 2004.
        </h2>

        {error2 ? (
          <div className="alert alert-error shadow-lg">
            <span>{error2.message}</span>
          </div>
        ) : (
          <div>
            <table className="table w-full rounded-lg">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Country</th>
                  <th>Total Production</th>
                </tr>
              </thead>
              <tbody>
                {data2 &&
                  data2.map((row, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{row.country}</td>
                      <td>{row.total_production}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Second Highest Coffee Production by Type (1990-1994): */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Second Highest Coffee Production by Type (1990-1994):</h1>
        <h2>
          <b>Scenario:</b> Understanding the diversity in coffee production is crucial for market analysis. <br />
          <b>Task: </b>Identify countries with the second highest coffee production for each coffee type from 1990-1994.
          Note that there can be multiple countries tied for the second place.
        </h2>

        {error3 ? (
          <div className="alert alert-error shadow-lg">
            <span>{error3.message}</span>
          </div>
        ) : (
          <div>
            <table className="table w-full rounded-lg">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Country</th>
                  <th>Total Production</th>
                </tr>
              </thead>
              <tbody>
                {data3 &&
                  // Group rows by coffee_type
                  Object.entries(
                    data3.reduce((acc, row) => {
                      acc[row.coffee_type] = acc[row.coffee_type] || []
                      acc[row.coffee_type].push(row)
                      return acc
                    }, {})
                  ).map(([coffeeType, rows]) =>
                    rows.map((row, index) => (
                      <tr
                        key={`${coffeeType}-${index}`}
                        className={row.rank === 2 ? "bg-white font-bold text-black" : ""}
                      >
                        <td>{row.coffee_type}</td>
                        <td>{row.country}</td>
                        <td>{row.total_production}</td>
                      </tr>
                    ))
                  )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Top Five Countries in Combined Exports and Imports (1995-2000): */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Top Five Countries in Combined Exports and Imports (1995-2000):</h1>
        <h2>
          <b>Scenario:</b> The company is assessing its global trade footprint. <br />
          <b>Task: </b>Name the top five countries with the most combined coffee export and import volume between 1995
          to 2000.
        </h2>
        <p>
          <b>Expected Output:</b> A CSV file containing columns for country, export volume, import volume, and total
          combined volume for the specified period.{" "}
        </p>
        <DownloadButton data={data4} />
        <div className="container mx-auto p-6">
          <table className="mt-4 w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Country</th>
                <th className="border border-gray-300 px-4 py-2">Total Export</th>
                <th className="border border-gray-300 px-4 py-2">Total Import</th>
                <th className="border border-gray-300 px-4 py-2">Total Combined</th>
              </tr>
            </thead>
            <tbody>
              {data4.map((row, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{row.country}</td>
                  <td className="border border-gray-300 px-4 py-2">{row.total_export}</td>
                  <td className="border border-gray-300 px-4 py-2">{row.total_import}</td>
                  <td className="border border-gray-300 px-4 py-2">{row.total_combined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Import Analysis with Country of Origin: */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Import Analysis with Country of Origin:</h1>
        <h2>
          <b>Scenario:</b> For supply chain optimization, the company seeks detailed import data. <br />
          <b>Task: </b>Attempt to show imports for every country, including the country of origin for those imports,
          ranked by import volume. <br />
          <b>Expected Output:</b> Explain why this data might not be retrievable from the current database structure.
          Suggest alternative methods or additional data that could be used to fulfill this request.
        </h2>
        <p>
          So I believe the current database structure does not have the right data to show imports for every country,
          the CSV has the import volume but not the country of origin for those imports, same with the export data. We
          would need either a new table that contains the country of origin for each import, or we could collect this
          data from other external trusted sources. (No fake coffee data)
        </p>
      </div>

      {/* Closing Thoughts */}
      <h1 className="text-2xl font-bold">Closing Thoughts:</h1>
      <p>
        A lot of this would have gone easier if I had done this work on my local machine, but I wanted to show how to
        interact with the Supabase API and how to use the data returned from the API. As well as formatting the data in a
        way that is easy to read and understand. The download button also presented quite the challenge, but I was able
        to get it working in the end. I hope you enjoyed this project and I hope you have a great day!
      </p>

      {/* Syntax Highlighters for SQL Queries */}
      <div>
        <h2 className="py-2 text-xl font-semibold">SQL Query for Top Exporter:</h2>
        <SyntaxHighlighter language="sql" style={a11yDark}>
          {codeString01}
        </SyntaxHighlighter>
      </div>
      <div>
        <h2 className="py-2 text-xl font-semibold">SQL Query for Top Producers:</h2>
        <SyntaxHighlighter language="sql" style={a11yDark}>
          {codeString02}
        </SyntaxHighlighter>
      </div>
      <div>
        <h2 className="py-2 text-xl font-semibold">SQL Query for Second Highest Production by Type:</h2>
        <SyntaxHighlighter language="sql" style={a11yDark}>
          {codeString03}
        </SyntaxHighlighter>
      </div>
      <div>
        <h2 className="py-2 text-xl font-semibold">SQL Query for Combined Trade:</h2>
        <SyntaxHighlighter language="sql" style={a11yDark}>
          {codeString04}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
