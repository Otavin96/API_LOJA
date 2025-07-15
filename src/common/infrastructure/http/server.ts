import { app } from "./app";
import { env } from "../env";
import { dataSource } from "../typeorm";
import "@/common/infrastructure/container";
import path from "path";

async function startServer() {
  try {
    // 🔹 Inicializar o banco de dados
    await dataSource.initialize();
    console.log("✅ Conectado ao PostgreSQL!");
    console.log("Servindo arquivos estáticos de:", path.resolve(__dirname, "..", "..","..","..", "uploads"));

    // 🔹 Iniciar o servidor apenas se tudo estiver OK
    app.listen(env.PORT, () => {
      console.log(`🚀 Server running on port ${env.PORT}! 🏆`);
      console.log("📚 API docs available at GET /docs");

    });
  } catch (error) {
    console.error("❌ Erro ao iniciar o servidor:", error);
    process.exit(1); // Encerra a aplicação se falhar
  }
}

// 🔹 Chamar a função de inicialização
startServer();
