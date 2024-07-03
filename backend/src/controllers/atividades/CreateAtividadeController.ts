import { Request, Response } from "express";
import { CreateAtividadeService } from "../../services/atividades/CreateAtividadeService";

class CreateAtividadeController {
    async handle(req: Request, res: Response) {

        const { local, horario, nome, descricao, vagas } = req.body;
        const evento_id = req.query.id as string 

        const createAtividadeService = new CreateAtividadeService();

        if (!req.file) {

            throw new Error("Erro ao enviar arquivo");

        } else {

            const { originalname, filename: banner } = req.file;

            const atividade = await createAtividadeService.execute({

                local,
                horario,
                nome,
                descricao,
                vagas,
                banner,
                evento_id
            })
            return res.json(atividade)
        }
    }
}
export { CreateAtividadeController }