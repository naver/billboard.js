import bb, {pie} from "../../dist-esm/billboard.js";

pie();

bb.generate({data: {columns: [["data1", 30, 50, 20]], type: pie()}});
