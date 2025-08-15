import { PrismaClient, Prisma } from "@prisma/client";
import { Logger } from "winston";
import { Inject, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";

export class PrismaService
  extends PrismaClient<
    Prisma.PrismaClientOptions,
    "query" | "info" | "warn" | "error"
  >
  implements OnModuleInit, OnModuleDestroy
{
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {
    super({
      log: [
        { emit: "event", level: "info" },
        { emit: "event", level: "warn" },
        { emit: "event", level: "error" },
        { emit: "event", level: "query" },
      ],
    });
  }

  async onModuleInit() {
    await this.$connect();

    this.$on("info", (e) => this.logger.info(e.message));
    this.$on("warn", (e) => this.logger.warn(e.message));
    this.$on("error", (e) => this.logger.error(e.message));

    this.$on("query", (e: Prisma.QueryEvent) => {
      this.logger.info(`[QUERY] ${e.query} Params: ${e.params} Duration: ${e.duration}ms`);
    });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
