import { Request, Response } from "express";
import { UpdateAtividadesService } from "../../services/atividades/UpdateAtividadesService";

class UpdateAtividadeController {
    async handle(req: Request, res: Response) {
        const id = req.query.id as string;
        const { nome, descricao, local, horario, vagas, ch, concomitante } = req.body;


        if (!req.file) {
            throw new Error("Erro ao enviar arquivo");
        } else {

          

            const updateAtividadesService = new UpdateAtividadesService();

           const atividade = await updateAtividadesService.execute({
                id, local, horario, ch, concomitante, nome, descricao, vagas
            })

            res.json(atividade)

        }
    }
}
export { UpdateAtividadeController }