import { hashSync } from "bcryptjs";
import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import Contact from "./contacts.entity";

@Entity("clients")
class Client {
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

	@OneToMany(() => Contact, (contact) => contact.client)
	contacts: Contact[];

	@BeforeInsert()
	@BeforeUpdate()
	hashPassword() {
		this.password = hashSync(this.password, 7);
	}
}

export default Client;
