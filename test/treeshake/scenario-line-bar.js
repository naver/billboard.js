import bb, {line, bar} from "../../dist-esm/index.esm.js";

line();
bar();

bb.generate({data: {columns: [["data1", 1, 2, 3]], type: bar()}});
