import { Request, Response } from "express";
import { CreateAtividadeService } from "../../services/atividades/CreateAtividadeService";

class CreateAtividadeController {
    async handle(req: Request, res: Response) {

        const { local, horario, nome, descricao, vagas, evento_id } = req.body;

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