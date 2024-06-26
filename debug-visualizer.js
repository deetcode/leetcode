var AsciiTable = require("ascii-table");

// @ts-check
/**
 * @type {import("@hediet/debug-visualizer-data-extraction").LoadDataExtractorsFn}
 */
module.exports = (register, helpers) => {
  register({
    id: "hash-set-as-string",
    getExtractions(data, collector, context) {
      if (!(data instanceof Set)) {
        return;
      }

      let text = "SET\n-----------\n";

      for (const item of data) {
        text += `${item}\n`;
      }

      collector.addExtraction({
        priority: 1000,
        id: "hash-set-as-string",
        name: "Hash Set as String",
        extractData() {
          return helpers.asData({
            kind: { text: true },
            text: text,
          });
        },
      });
    },
  });

  register({
    id: "map-as-table",
    getExtractions(data, collector, context) {
      if (!(data instanceof Map)) {
        return;
      }

      collector.addExtraction({
        priority: 1000,
        id: "map-as-table",
        name: "Map as Table",
        extractData() {
          return helpers.asData({
            kind: { table: true },
            rows: [...data].map(([k, v]) => ({
              key: k.toString(),
              value: v.toString(),
            })),
          });
        },
      });
    },
  });

  register({
    id: "2d-array-as-grid",
    getExtractions(data, collector, context) {
      if (!(data instanceof Array)) {
        return;
      }

      if (!(data[0] instanceof Array)) {
        return;
      }

      collector.addExtraction({
        priority: 1000,
        id: "2d-array-as-grid",
        name: "2 Dimensional Array Grid",
        extractData() {
          return helpers.asData({
            kind: { grid: true },
            rows: [...data].map((arr, i) => {
              const a = arr.map((x) => {
                return { content: x.toString() };
              });
              return {
                columns: a,
              };
            }),
          });
        },
      });
    },
  });

  register({
    id: "json-stringify",
    getExtractions(data, collector, context) {
      collector.addExtraction({
        priority: 1000,
        id: "json-stringify",
        name: "JSON Stringify",
        extractData() {
          return helpers.asData({
            kind: { text: true },
            text: JSON.stringify(data),
          });
        },
      });
    },
  });

  register({
    id: "2d-array-as-plotly-table",
    getExtractions(data, collector, context) {
      if (!(data instanceof Array)) {
        return;
      }

      if (!(data[0] instanceof Array)) {
        return;
      }

      collector.addExtraction({
        priority: 1000,
        id: "2d-array-as-plotly-table",
        name: "2d Array as Plotly Table",
        extractData() {
          const n = data.length;
          const m = data[0].length;
          const headers = [""];
          for (let i = 0; i < m; i++) {
            headers.push(i.toString());
          }
          const leftHeaders = [];
          for (let i = 0; i < n; i++) {
            leftHeaders.push(i.toString() + ":");
          }
          const transposed = transpose(data);

          return helpers.asData({
            kind: { plotly: true },
            data: [
              {
                header: {
                  values: headers,
                },
                cells: {
                  values: [leftHeaders, ...transposed],
                  align: ["left", "center"],
                },
                // @ts-ignore
                type: "table",
              },
            ],
            layout: {},
          });
        },
      });
    },
  });

  register({
    id: "map-as-plotly-table",
    getExtractions(data, collector, context) {
      if (!(data instanceof Map)) {
        return;
      }

      const headers = ["key", "value"];
      const transposed = transpose([...data.entries()]);

      collector.addExtraction({
        priority: 1000,
        id: "map-as-plotly-table",
        name: "Map as Plotly Table",
        extractData() {
          return helpers.asData({
            kind: { plotly: true },
            data: [
              {
                header: {
                  values: headers,
                },
                cells: {
                  values: [...transposed],
                },
                // @ts-ignore
                type: "table",
              },
            ],
            layout: {},
          });
        },
      });
    },
  });

  register({
    id: "hash-set-as-plotly-table",
    getExtractions(data, collector, context) {
      if (!(data instanceof Set)) {
        return;
      }

      const headers = ["key", "value"];
      const transposed = transpose([...data.entries()]);

      collector.addExtraction({
        priority: 1000,
        id: "hash-set-as-plotly-table",
        name: "Hash Set as Plotly Table",
        extractData() {
          return helpers.asData({
            kind: { plotly: true },
            data: [
              {
                header: {
                  values: headers,
                },
                cells: {
                  values: [...transposed],
                },
                // @ts-ignore
                type: "table",
              },
            ],
            layout: {},
          });
        },
      });
    },
  });

  register({
    id: "map-as-ascii-table",
    getExtractions(data, collector, context) {
      if (!(data instanceof Map)) {
        return;
      }

      var table = new AsciiTable();

      table.setHeading("key", "value");

      for (const [key, value] of data) {
        table.addRow(key, value);
      }

      collector.addExtraction({
        priority: 2000,
        id: "map-as-ascii-table",
        name: "Map as Ascii Table",
        extractData() {
          return helpers.asData({
            kind: { text: true },
            text: table.toString(),
          });
        },
      });
    },
  });

  register({
    id: "2d-array-as-ascii-table",
    getExtractions(data, collector, context) {
      if (!(data instanceof Array)) {
        return;
      }

      if (!(data[0] instanceof Array)) {
        return;
      }

      const table = new AsciiTable();
      const headings = [null];

      for (let i = 0; i < data[0].length; i++) {
        headings.push(i + ":");
      }

      table.setHeading(...headings);

      for (let i = 0; i < data.length; i++) {
        table.addRow(i + ":", ...data[i]);
      }

      collector.addExtraction({
        priority: 2000,
        id: "2d-array-as-ascii-table",
        name: "2d Array as Ascii Table",
        extractData() {
          return helpers.asData({
            kind: { text: true },
            text: table.toString(),
          });
        },
      });
    },
  });
};

function transpose(matrix) {
  return matrix[0].map((col, i) => matrix.map((row) => row[i]));
}
