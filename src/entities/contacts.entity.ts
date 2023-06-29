import { hashSync } from "bcryptjs";
import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import Client from "./clients.entity";

@Entity("contacts")
class Contact {
	@PrimaryGeneratedColumn("increment")
	id: number;

	@Column({ length: 45 })
	name: string;

	@Column({ length: 45, unique: true })
	email: string;

	@Column()
	phone: number;

	@Column({ length: 120 })
	password: string;

	@CreateDateColumn({ type: "date" })
	createdAt: string;

	@UpdateDateColumn({ type: "date" })
	updatedAt: string;

	@DeleteDateColumn({ type: "date" })
	deletedAt: string;

	@ManyToOne(() => Client, (client) => client.contacts, {
		onDelete: "CASCADE",
		nullable: false,
	})
	client: Client;

	@BeforeInsert()
	@BeforeUpdate()
	hashPassword() {
		this.password = hashSync(this.password, 7);
	}
}

export default Contact;
