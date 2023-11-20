import { PrismaClient } from "@prisma/client";
declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace NodeJS {
		interface Global {
			prisma: PrismaClient;
		}
	}
}

const prismaClientSingleton = () => {
	return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
	prisma: PrismaClientSingleton | undefined;
};
let prisma: PrismaClient;

if (typeof window === "undefined") {
	if (process.env.NODE_ENV === "production") {
		prisma = prismaClientSingleton();
	} else {
		if (!globalForPrisma.prisma) {
			globalForPrisma.prisma = new PrismaClient();
		}

		prisma = globalForPrisma.prisma;
	}
}
// @ts-expect-error sddf
export default prisma;
