import { Injectable,NestMiddleware } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { JwtService } from "./jwt.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        private prismaService : PrismaService,
        private jwtService: JwtService
    ) {
    }

    async use(req: any, res: any, next: (error?: any) => void) {
        const token = req.headers['authorization'] as string;

        if(token) {
            // Remove 'Bearer ' prefix if present
            const cleanToken = token.replace('Bearer ', '');
            
            // Verify JWT token
            const payload = this.jwtService.verifyToken(cleanToken);
            
            if (payload) {
                // Find user by username from JWT payload
                const user = await this.prismaService.user.findUnique({
                    where: {
                        username: payload.username
                    },
                });

                if (user) {
                    req.user = user;
                }
            }
        }

        next()
    }

}