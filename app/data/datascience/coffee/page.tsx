import { supabase } from "../../../utils/supabase/server"
// @ts-ignore
import SyntaxHighlighter from "react-syntax-highlighter"
// @ts-ignore
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs"

export default async function CoffeePage() {
  // Fetch data using Supabase RPC calls
  const { data: data1, error: error1 } = await supabase.rpc("top_export")
  const { data: data2, error: error2 } = await supabase.rpc("top_total_production")

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
        'total_production', (COALESCE("1999/00", 0) + COALESCE("2000/01", 0))
      )
    )
    FROM (
      SELECT "Country", 
             (COALESCE("1999/00", 0) + COALESCE("2000/01", 0)) AS total_production
      FROM coffee_production
      ORDER BY total_production DESC
      LIMIT 3
    ) subquery
  );
END;
`

  return (
    <div className="container mx-auto my-2 space-y-8 rounded-lg bg-black p-6 shadow-lg">
      {/* Top Exporter (1990-1994) */}
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

      {/* Top Coffee Producers (1999/00 - 2000/01) */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Top Coffee Producers (1999/00 - 2000/01)</h1>
        <h2>
          <b>Scenario:</b> To plan future coffee sourcing strategies, the company needs to identify key coffee-producing
          countries. <br />
          <b>Task: </b>Find the top 3 coffee producers during the years 1999/00 - 2000/01.
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
    </div>
  )
}
