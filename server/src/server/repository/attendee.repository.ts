import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as nodemailer from 'nodemailer';

const sendAnnouncement = async (contact: string, content: string, subject: string) => {
    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "chi.hathuy15@gmail.com",
                pass: "xrbt lkkf cjzg arnx",
            },
        });
    
        let info = await transporter.sendMail({
            from: `chi.hathuy15@gmail.com`,
            to: contact,
            subject: subject,
            // text: `Your event has a guest update:\n`,
            html: content
        });
        return info.messageId;
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Error sending new attendee announcement email");
    }
};

@Injectable()
export class AttendeeRepository {
    constructor (private prismaService: PrismaService) {}

    async registerEvent(
        userId: number,
        ticketId: number,
        email:string
    ) {
        const event = await this.prismaService.ticket.findFirst({
            where: {
                id: ticketId
            },
            select: {
                Event: {
                    select: {
                        name: true,
                        User: {
                            select: {
                                email: true
                            }
                        }
                    }
                },
            }
        });
        const content = `<h3>Your event has a guest update:</h3><p>1 more going.</p>`;
        const subject =  `Guest update for event ${event.Event.name}`;
        
        // send email to event organizer
        sendAnnouncement(event.Event.User.email, content, subject); 
        // send email to attendee
        sendAnnouncement(email, `<h3>You marked yourself as going to ${event.Event.name}</h3>`, `Registration to ${event.Event.name}`);

        const createdAttendance = await this.prismaService.attendee.create({
            data: {
                userId: userId,
                ticketId: ticketId
            }
        });
        return createdAttendance;
    };

    async cancelRegistration(
        userId: number,
        ticketId: number,
        email:string
    ) {
        const event = await this.prismaService.ticket.findFirst({
            where: {
                id: ticketId
            },
            select: {
                Event: {
                    select: {
                        name: true,
                        User: {
                            select: {
                                email: true
                            }
                        }
                    }
                },
            }
        });
        const content = `<h3>Your event has a guest update:</h3><p>1 more not going.</p>`;
        const subject =  `Guest update for event ${event.Event.name}`;

        // send email to event organizer
        sendAnnouncement(event.Event.User.email, content, subject); 
        // send email to attendee
        sendAnnouncement(email, `<h3>You marked yourself as NOT going to ${event.Event.name}</h3>`, `Registration to ${event.Event.name}`); 

        const createdAttendance = await this.prismaService.attendee.delete({
            where: {
                attendeeId: {
                    userId: userId,
                    ticketId: ticketId
                }
            }
        });
        return createdAttendance;
    };

    async findAttendee(
        userId: number,
        ticketId: number,
    ) {
        const foundAttendee = await this.prismaService.attendee.findFirst({
            where: {
                userId: userId,
                ticketId: ticketId
            }
        });
        return foundAttendee;
    };
    

    
}