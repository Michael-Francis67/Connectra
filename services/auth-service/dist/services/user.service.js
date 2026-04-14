import PrismaService from './prisma.service';
export class UserService {
    prisma = new PrismaService().getPrisma();
    constructor() {
        this.prisma = new PrismaService().getPrisma();
    }
    async getUser(id) {
        return this.prisma.user.findUnique({
            where: {
                clerkId: id,
            },
        });
    }
}
