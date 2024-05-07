import { Request, Response } from "express";
import { UpdateAtividadesService } from "../../services/atividades/UpdateAtividadesService";

class UpdateAtividadeController {
    async handle(req: Request, res: Response) {

        const { id, local, horario, descricao, vagas, evento_id } = req.body;

        const updateAtividadesService = new UpdateAtividadesService();
        if (!req.file) {
            throw new Error("Erro ao enviar arquivo");
        } else {

            const { originalname, filename: banner } = req.file;

            const updateAtividadesService = new UpdateAtividadesService();

            const atividade = await updateAtividadesService.execute({
                id: id,
                local: local,
                horario: horario,
                descricao: descricao,
                vagas: vagas,
                banner: banner,
                evento_id: evento_id
            })
            return res.json({
                message: "Alterado com sucesso!"
            });
        }
    }
}
export { UpdateAtividadeController }