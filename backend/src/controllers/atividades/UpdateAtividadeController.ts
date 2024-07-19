import { Request, Response } from "express";
import { UpdateAtividadesService } from "../../services/atividades/UpdateAtividadesService";

class UpdateAtividadeController {
    async handle(req: Request, res: Response) {

        const { id, nome, responsavel, colaboradores, descricao, local, horario, vagas, ch, concomitante, banner, evento_id   } = req.body;

        if (!req.file) {
            throw new Error("Erro ao enviar arquivo");
        } else {

            const { originalname, filename: banner } = req.file;

            const updateAtividadesService = new UpdateAtividadesService();

            const atividade = await updateAtividadesService.execute({
                id: id,
                nome:nome,
                responsavel:responsavel,
                colaboradores:colaboradores,
                local: local,
                horario: horario,
                ch:ch,
                concomitante:concomitante,
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