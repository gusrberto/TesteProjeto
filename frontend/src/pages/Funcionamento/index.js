import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FuncionamentoCard from "../../components/FuncionamentoCard";
import { getAllWorkSchedule } from "../../store/modules/grade/sagas";
import { sessionStatus } from "../../contexts/AuthContext";

const Funcionamento = () => {
    
    const navigate = useNavigate();

    const navigatePressDiasDeFuncionamnto = "/funcionamento";
    const navigatePressDiasdeAfastamento = "/afastamento";

    const [isMenuOpened, setMenuOpened] = useState(null);
    const [workSchedules, setWorkSchedules] = useState([]);

    async function listAllWorkSchedule() {
        const response = await getAllWorkSchedule();

        if (response)
            setWorkSchedules(response.data);
    }

    const translationTable = {
        "MON": "Segunda-Feira",
        "TUE": "Terça-Feira",
        "WED": "Quarta-Feira",
        "THU": "Quinta-Feira",
        "FRI": "Sexta-Feira",
        "SAT": "Sábado",
        "SUN": "Domingo"
    }

    useEffect(() => {
        sessionStatus(navigate)
        .then(() => listAllWorkSchedule());
    }, [navigate]);

    return(
        <div className="col m-5 overflow-auto h-100">
            <div className="row">
                <div className="col-12">
                    <div className="w-100 d-flex ">
                        <Button
                            className="menu-funcionamento"
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick={(event) => {setMenuOpened(event.currentTarget)}}>
                            <span className="mdi mdi-chevron-down">Dias de Funcionamento</span> 
                        </Button>
                        <Menu
                            keepMounted
                            anchorEl={isMenuOpened}
                            onClose={() => {setMenuOpened(null);}}
                            open={Boolean(isMenuOpened)}>
                            <MenuItem onClick={() => {
                                setMenuOpened(null);
                                navigate(navigatePressDiasDeFuncionamnto);
                                }}>
                                Dias de Funcionamento
                            </MenuItem>
                            <MenuItem onClick={() => {
                                setMenuOpened(null);
                                navigate(navigatePressDiasdeAfastamento);
                                }}>
                                Dias de Afastamentos
                            </MenuItem>
                        </Menu>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-2">
                    <div className="w-100 d-flex justify-content-center">
                        <span className="h5">Dias da Semana</span>
                    </div>
                </div>
                <div className="col-3">
                    <div className="w-100 d-flex justify-content-center">
                        <span className="h5">Horário de Início</span>
                    </div>
                </div>
                <div className="col-3">
                    <div className="w-100 d-flex justify-content-center">
                        <span className="h5">Horário de Fim</span>
                    </div>
                </div>
                <div className="col-2">
                    <div className="w-100 d-flex justify-content-center">
                        <span className="h5">Trabalhará?</span>
                    </div>
                </div>
                <div className="col-2">
                    <div className="w-100 d-flex justify-content-center">
                        <span className="h5">Editar</span>
                    </div>
                </div>
            </div>
            {workSchedules.map((workSchedule) => (
                <FuncionamentoCard
                    key={workSchedule.idWorkSchedule}
                    id={workSchedule.idWorkSchedule}
                    diaDaSemana={translationTable[workSchedule.dayOfWeek]}
                    startTime={workSchedule.startTime}
                    endTime={workSchedule.endTime}
                    isActive={workSchedule.activeDay}
                />
            ))}; 
        </div>
    ); 
};

export default Funcionamento; 
