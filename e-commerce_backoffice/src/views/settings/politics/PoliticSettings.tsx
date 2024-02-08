import React, {useState, useEffect} from 'react'
import { ShippingMethod } from '../../../models/ShippingMethod'
import useSettings from '../../../hooks/useSettings'
import MapSettings from '../MapSettings';
import { Policies } from '../../../models/settings/Policies';
import usePolitics from '../../../hooks/usePolitics';
import { Policy } from '../../../models/settings/Policy';
import './politics.css'


type PoliticState = {
  politics: Policies;
}
type SaveState = {
  isSaving: boolean;
  content_in_save: [any, any][];
  save_result: Save;
  content_saved: [any, any][];
}
type Save = {
  isSaved: boolean;
  isFailed: boolean;
}

export default function PoliticSettings() {
  const [state, setState] = useState<PoliticState>()
  const [saveState, setsaveState] = useState<SaveState>();
  const dicoText: { [key: string]: string } = useSettings.getDicoText() as { [key: string]: string };
  const dicoIcon: { [key: string]: string } = useSettings.getDicoIcon() as { [key: string]: string };

  
  const sections = {
    'legal_notice' : {
        'title': "Mentions Légales",
        "data-show_input": "legal_notice_textarea_input",
        "data-show-input_2": "shipping_method_availability_input_container",
        "data-hide-text": "legal_notice_content",
        "data-hide-text_2": "availability_label",
        "isButton": true,
        "section_type": "legal_notice",
        "politic": state ? state?.politics?.legal_notice : [],
    }, 
    'terms_of_sale' : {
      'title': "Conditions de vente",
      "data-show_input": "terms_of_sale_textarea_input",
      "data-hide-text": "term_of_sale_content",
      "isButton": true,
      "section_type": "terms_of_sale",
      "politic": state ? state?.politics?.terms_of_sale : [],
    },
    'refund_policy' : {
      'title': "Politique de retour",
      "data-show_input": "refund_policy_textarea_input",
      "data-hide-text": "refund_policy_content",
      "isButton": true,
      "section_type": "refund_policy",
      "politic": state ? state?.politics?.refund_policy : [],
    },
    'shipping_policy' : {
      'title': "Politique de livraison",
      "data-show_input": "shippin_policy_textarea_input",
      "data-hide-text": "shipping_policy_content",
      "isButton": true,
      "section_type": "shipping_policy",
      "politic": state ? state?.politics?.shipping_policy : [],
    },
    'privacy_policy' : {
        "title" : "Politique de confidentialité", 
        "data-show_input": "privacy_policy_textarea_input",
        "data-hide-text": "privacy_policy_content",
        "isButton": true,
        "section_type": "privacy_policy",
        "politic": state ? state?.politics?.privacy_policy : [],
    }, 
    'cookies_policy' : {
      'title': "Politique de cookies",
      "data-show_input": "cookies_policy_textarea_input",
      "data-hide-text": "cookies_policy_content",
      "isButton": true,
      "section_type": "cookies_policy",
      "politic": state ? state?.politics?.cookies_policy : [],
    },
    
   
  }
  const showMore = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const parent = target.parentElement?.parentElement
    const div_with_limit = parent?.firstChild as HTMLDivElement;
    div_with_limit.classList.toggle('politic_reader_limit');
    modifBtnText(e, "show_more");
  }


  const modifBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    modifBtnText(e, "change");
    showInputs(e);
    hideText(e);

  }

  const inputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    
  }

  const modifBtnText = (e: React.MouseEvent<HTMLButtonElement>, type:string) => {
    const btn = e.target as HTMLButtonElement;
    if (type === 'change'){
      if (btn.innerText === 'Modifier') {
        btn.innerText = 'Enregistrer';
      }
      else {
        btn.innerText = 'Modifier';
      }
    }
    if (type === 'show_more'){
      if (btn.innerText === 'Voir Plus') {
        btn.innerText = 'Voir Moins';
      }
      else {
        btn.innerText = 'Voir Plus';
      }
    }
  }
  const showInputs = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const dataShow = target.dataset.showinput_2 !== '' ? [ target.dataset.showinput as string, target.dataset.showinput_2 as string] : [ target.dataset.showinput as string]
    dataShow.forEach((data: string) => {
      const textarea = document.getElementById(data as string);
      const container = textarea?.parentElement as HTMLDivElement;
      if (container) {
        container.classList.toggle('hide');
      }
      
    })
  }
  const hideText = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const dataHide = target.dataset.hidetext_2 ? [ target.dataset.hidetext as string, target.dataset.hidetext_2 as string] : [ target.dataset.hidetext as string]
    dataHide.forEach((data: string) => {
      const texts = document.getElementsByClassName(data as string);
      if (texts) {
        const textsArray = Array.from(texts);
        textsArray.forEach((text: any) => {
          text.classList.toggle('hide');
        })
      }
    })
  }
  const new_politic_content_obj = (content: any, class_name:string) => {
    return (
      <div className={class_name} dangerouslySetInnerHTML={{__html: content}}></div>
    )
  }
  const politic_format = (politic_content: string) => {
    const politic_content_array = politic_content.split('**');
    let new_politic_content = '';
    let new_politic_content_html = '';
    politic_content_array.forEach((paragraph: string) => {
      new_politic_content += paragraph + '\n\n';
      new_politic_content_html += `<p>${paragraph}</p>`
    })
    return [new_politic_content, new_politic_content_html];
  }
  
  
  useEffect(() => {
    const politics_data = usePolitics.getPolitics();
    politics_data.then((data) => {
      if (data) {
        setState({
          politics: data as Policies
        });
      }
    });
  }, []);
  

  return (
    <>
     <div className='main_page settings_container'>
     <h2>Politiques</h2>
     {Object.entries(sections).map((data: [string, any]) => {
      const new_politic = politic_format(data[1].politic['content'] ? data[1].politic['content'] : ''); 
         return (
             <div className='section_settings_container' key={data[0]}>
                 <div className='settings_container_header'>
                     <h3>{data[1].title}</h3>
                     {data[1].isButton ? 
                     <button className='button btn modif_btn' 
                        data-showinput={data[1]['data-show_input']} 
                        data-showinput_2={data[1]['data-show-input_2'] ? data[1]['data-show-input_2'] : ''} 
                        data-hidetext={data[1]['data-hide-text']}
                        data-hidetext_2={data[1]['data-hide-text_2'] ? data[1]['data-hide-text_2'] : ''}
                        data-is_save="false"
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => modifBtnClick(e)}>
                          Modifier
                      </button> : <></>}
                 </div>
                 <div className='settings_politics_container' id={data[1]['settings_container_id']}>
                    
                    <div className='politic_container politic_reader_limit'>
                      {new_politic_content_obj(new_politic[1], data[1]['data-hide-text']) }
                      {new_politic[0] !== state?.politics[data[1].section_type as keyof typeof state.politics]?.toString() ?
                      <div className='politic_content_input_container hide '>
                        <textarea className='shipping_method_input politic_content_input' id={data[1]['section_type'] + '_textarea_input'} defaultValue={state?.politics[data[1].section_type as keyof typeof state.politics].content} onChange={(e:React.ChangeEvent<HTMLTextAreaElement>) => inputChange(e)}></textarea>
                      </div>
                      : <></>}
                    </div>
                    <div className='btn_container'>
                      <button className='button btn show_more' onClick={(e: React.MouseEvent<HTMLButtonElement>) => showMore(e)}>Voir Plus</button>
                    </div>
                 </div>
             </div>
         )
     })}
    </div>
    </>
  )
}
