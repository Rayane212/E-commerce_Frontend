import React, {useState, useEffect} from 'react'
import { Employe } from '../../../models/settings/Employe'
import useSettings from '../../../hooks/useSettings';
import { Admin } from '../../../models/settings/Admin';
import MapSettings from '../MapSettings';
import MapUsersSettings from './MapUsersSettings';


type UsersSettingsState = {
    admins: Admin[];
    employees: Employe[];
}


export default function UsersSettings() {
    const [state, setState] = React.useState<UsersSettingsState>();
    const adminsInfosArray = state ? Object.entries(state?.admins as Admin[]) : [];
    const employeesInfosArray = state ? Object.entries(state?.employees as Employe[]) : [];
    const dicoText: { [key: string]: string } = useSettings.getDicoText() as { [key: string]: string };
    const dicoIcon: { [key: string]: string } = useSettings.getDicoIcon() as { [key: string]: string };


    const sections = {
        'admins' : {
            "title" : "Administrateurs", 
            "data-show-btn": "admin_setting_container",
            "settings_container_id": "profil_settings_container",
            "list_1": adminsInfosArray?.slice(0, 2),
            "list_2": adminsInfosArray?.slice(2, 4)
        }, 
        'employees' : {
            'title': "Employés",
            "data-show-btn": "admin_setting_container",
            "settings_container_id": "profil_settings_container",
            "list_1": employeesInfosArray?.slice(0, 2),
            "list_2": employeesInfosArray?.slice(2, 4)
        }
    }
    

    useEffect(() => {
        const all_workers = useSettings.getWorkers(); 
        all_workers.then((data) => {
            if (data !== undefined){
                setState({
                    admins: data?.adminsInfos as Admin[],
                    employees: data?.employeesInfos as Employe[]
                })
            }
        })
    }, [])
    
  return (
    <div className='settings_container'>
        <h2>Paramètres Utilisateurs</h2>
        {Object.entries(sections).map((data: [string, any]) => {
            return ( 
                <div className='section_settings_container' key={data[0]}>
                    <div className='settings_container_header'>
                        <h3>{data[1].title}</h3>
                        <button className='button btn modif_btn' data-show={data[1]['data-show-btn']}>Modifier</button>
                    </div>
                    <div className='settings_container' id={data[1]['settings_container_id']}>
                        <div className='infos_container'>
                            {!data[1] ? '' : <> 
                            {data[1].list_1.length === 0 && data[1].list_2.length === 0 ? 
                                
                                <p>Aucun collaborateurs externes ajoutés.</p> :
                            <>
                                <div className='infos_container_grid'>
                                    <MapUsersSettings list={data[1].list_1} dicoIcon={dicoIcon} dicoText={dicoText} />
                                </div>
                                <div className='infos_container_grid'>
                                    <MapUsersSettings list={data[1].list_2} dicoIcon={dicoIcon} dicoText={dicoText} />
                                </div>
                            </>
                            }
                            </>
                            }
                        </div>
                    </div>
                </div>
            )
        })}
    </div>
  )
}
