import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";

const PROTO_PATH = path.join(__dirname, "..", "proto", "calculator.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const calculatorProto = grpc.loadPackageDefinition(packageDefinition) as any;

function main() {
  const client = new calculatorProto.Calculator(
    "localhost:50051",
    grpc.credentials.createInsecure()
  );

  const operations = [
    { name: "10 + 5", method: "Add", a: 10, b: 5 },
    { name: "10 - 5", method: "Subtract", a: 10, b: 5 },
    { name: "10 * 5", method: "Multiply", a: 10, b: 5 },
    { name: "10 / 5", method: "Divide", a: 10, b: 5 },
  ];

  console.log("Cliente gRPC de Calculadora");
  console.log("----------------------------");

  let completed = 0;
  for (const op of operations) {
    client[op.method]({ a: op.a, b: op.b }, (err: any, response: any) => {
      if (err) {
        console.error(`${op.name} = ERROR: ${err.message}`);
      } else {
        console.log(`${op.name} = ${response.result}`);
      }
      completed++;
      if (completed === operations.length) {
        console.log("\nTodas las peticiones completadas.");
        process.exit(0);
      }
    });
  }
}

main();
