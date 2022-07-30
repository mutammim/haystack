import { Prisma, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Prisma.ItemSelect>
) {
	if (req.method !== "POST") return;

	const body = req.body;

	console.log(body);

	await prisma.item.create({
		data: {
			title: body.title,
			desc: body.desc,
			url: body.url,
			imageUrl: body.imageUrl,
			rating: body.rating,
			dateLatest: body.dateLatest,
			datePublished: body.datePublished,
		},
	});

	res.status(200).json("ok");
}
