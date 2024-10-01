
"use client"

import { Card, CardHeader, Heading, CardBody, CardFooter, Button } from "@chakra-ui/react";
import { useSession } from "next-auth/react";


export default function Dashboard() {

    const { data: session } = useSession();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full  mt-2">
            <ol className="pl-4 list-decimal">
                <b className="text-xl">Frontend</b>
                <li className=""><b>Urgente!</b> Corrigir busca de atividades da api</li>
                <li> <b>Importante!</b> Criar form que passa os dados para a api de atualização das atividades</li>
                <li>Organizar diretorios para ter uma maior legibilidade nos componentes</li>
                <li>Adicionar componentes contendo mais detalhes sobre as atividades, como por exemplo o números de inscritos</li>
                <li>Refatorar efeito de destaque do menu lateral de acordo com o URL 'localhost/dashboard/ITEM_DA_LISTA/*"</li>
                <li>Adicionar busca de eventos pela barra de pesquisa</li>
                <li>buscar lib de geração de graficos para a pagina inicial do dashboard</li>
            </ol>
            <ol className="list-decimal">
                <b className="text-xl">Backend</b>
                <li className=""><b>Urgente!</b> Corrigir busca de atividades do banco de dados e o envio para o frontend</li>
                <li>Verificar regra de negocio das inscrições</li>
                <li>Atualizar códigos CRUD das rotas, controllers e services </li>
                <li>Criar rota api com o tratamento dos dados para gerar e exibir certificados  </li>
                <li>Adicionar rota de edição dos responsáveis da atividade</li>
                <li>Criar uma rota com regra de negocio para utilizar geolocalização</li>
            </ol>
{/* 
            <Card align='center' className="bg-slate-100 max-w-full mx-2">
                <CardHeader>
                    <Heading size='md'> Customer dashboard</Heading>
                </CardHeader>
                <CardBody>
                    <p>View a summary of all your customers over the last month.</p>
                </CardBody>
                <CardFooter>
                    <Button colorScheme='blue'>View here</Button>
                </CardFooter>
            </Card>

            <Card align='center' className="bg-slate-100 max-w-full mx-2">
                <CardHeader>
                    <Heading size='md'> Customer dashboard</Heading>
                </CardHeader>
                <CardBody>
                    <p>View a summary of all your customers over the last month.</p>
                </CardBody>
                <CardFooter>
                    <Button colorScheme='blue'>View here</Button>
                </CardFooter>
            </Card>
            <Card align='center' className="bg-slate-100 max-w-full">
                <CardHeader>
                    <Heading size='md'> Customer dashboard</Heading>
                </CardHeader>
                <CardBody>
                    <p>View a summary of all your customers over the last month.</p>
                </CardBody>
                <CardFooter>
                    <Button colorScheme='blue'>View here</Button>
                </CardFooter>
            </Card> */}
        </div>

    )
}