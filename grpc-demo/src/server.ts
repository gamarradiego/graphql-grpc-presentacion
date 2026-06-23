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

function add(call: any, callback: any) {
  const { a, b } = call.request;
  console.log(`  Petición: ADD ${a} + ${b}`);
  callback(null, { result: a + b });
}

function subtract(call: any, callback: any) {
  const { a, b } = call.request;
  console.log(`  Petición: SUB ${a} - ${b}`);
  callback(null, { result: a - b });
}

function multiply(call: any, callback: any) {
  const { a, b } = call.request;
  console.log(`  Petición: MUL ${a} * ${b}`);
  callback(null, { result: a * b });
}

function divide(call: any, callback: any) {
  const { a, b } = call.request;
  console.log(`  Petición: DIV ${a} / ${b}`);
  if (b === 0) {
    callback({ code: grpc.status.INVALID_ARGUMENT, message: "No se puede dividir por cero" });
    return;
  }
  callback(null, { result: a / b });
}

function main() {
  const server = new grpc.Server();
  server.addService(calculatorProto.Calculator.service, {
    Add: add,
    Subtract: subtract,
    Multiply: multiply,
    Divide: divide,
  });

  const address = "0.0.0.0:50051";
  server.bindAsync(address, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.error("Error al iniciar el servidor:", err);
      return;
    }
    console.log(`Servidor de calculadora ejecutándose en localhost:${port}`);
    server.start();
  });
}

main();
