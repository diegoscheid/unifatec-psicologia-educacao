const lessons=[
 {n:1,d:'04 NOV',title:'Introdução à disciplina',desc:'Apresentação da proposta, objetivos e concepções de ensino e aprendizagem.',status:'done'},
 {n:2,d:'11 NOV',title:'Fundamentos e teorias da aprendizagem',desc:'Principais perspectivas teóricas e suas implicações para a educação.',status:'done'},
 {n:3,d:'18 NOV',title:'Teorias da aprendizagem',desc:'Perspectivas comportamentalistas, cognitivas, histórico-culturais e suas contribuições.',status:'next'},
 {n:4,d:'25 NOV',title:'O papel do professor e do estudante',desc:'Mediação, interação e construção do conhecimento.',status:'future'},
 {n:5,d:'02 DEZ',title:'Metodologias de ensino',desc:'Estratégias tradicionais, ativas e participativas.',status:'future'},
 {n:6,d:'09 DEZ',title:'Planejamento pedagógico',desc:'Objetivos, conteúdos e estratégias de ensino.',status:'future'},
 {n:7,d:'16 DEZ',title:'Avaliação da aprendizagem',desc:'Concepções, instrumentos e práticas avaliativas.',status:'future'},
 {n:8,d:'23 DEZ',title:'Tecnologias e inteligência artificial na educação',desc:'Possibilidades, limites e desafios das tecnologias educacionais.',status:'future'},
 {n:9,d:'06 JAN',title:'Modelagem de processos de ensino-aprendizagem',desc:'Desenho de experiências e organização de processos educativos.',status:'future'},
 {n:10,d:'13 JAN',title:'Síntese e apresentação dos projetos',desc:'Socialização das propostas e avaliação do percurso formativo.',status:'future'}
];
const materials=[
 {a:1,t:'Apresentação da disciplina',type:'PDF',kind:'required',desc:'Plano de ensino, objetivos e organização do semestre.'},
 {a:2,t:'Teorias da aprendizagem: introdução',type:'ARTIGO',kind:'required',desc:'Texto introdutório sobre as principais teorias da aprendizagem.'},
 {a:3,t:'Aprendizagem e desenvolvimento humano',type:'CAPÍTULO',kind:'required',desc:'Leitura preparatória para a discussão das teorias.'},
 {a:3,t:'Vídeo: diferentes concepções de aprendizagem',type:'VÍDEO',kind:'extra',desc:'Recurso audiovisual para ampliar a compreensão do tema.'},
 {a:5,t:'Metodologias ativas na educação',type:'ARTIGO',kind:'extra',desc:'Discussão sobre possibilidades e limites das metodologias ativas.'},
 {a:7,t:'Avaliação formativa e aprendizagem',type:'CAPÍTULO',kind:'required',desc:'Referências para pensar a avaliação como parte do processo.'},
 {a:8,t:'Inteligência artificial e educação',type:'ARTIGO',kind:'extra',desc:'Reflexões sobre o uso crítico das tecnologias.'}
];
const assessments=[
 {n:'Avaliação 01',title:'Reflexão individual',desc:'Produção escrita sobre as concepções de aprendizagem discutidas na disciplina.',date:'A definir',status:'Orientações em breve'},
 {n:'Avaliação 02',title:'Atividade em grupo',desc:'Análise e elaboração de uma proposta de atividade de ensino-aprendizagem.',date:'A definir',status:'Orientações em breve'},
 {n:'Avaliação 03',title:'Projeto integrador',desc:'Construção e apresentação de uma proposta de modelagem de processo de ensino-aprendizagem.',date:'A definir',status:'Orientações em breve'}
];
const topics=[
 {a:1,q:'O que significa aprender? Podemos pensar a aprendizagem para além da aquisição de informações?',c:[]},
 {a:2,q:'Como diferentes teorias explicam os processos de aprendizagem?',c:[]},
 {a:3,q:'Quais são as implicações das teorias da aprendizagem para a prática docente?',c:[]},
 {a:5,q:'O que caracteriza uma metodologia de ensino como ativa?',c:[]},
 {a:7,q:'Avaliar é verificar o que foi aprendido ou também produzir aprendizagem?',c:[]}
];
const notices=[
 {title:'Materiais preparatórios disponíveis',date:'Comunicado da disciplina',body:'Os materiais indicados para a próxima aula estão disponíveis na biblioteca. Consulte as leituras antes do encontro.',type:'Acadêmico'},
 {title:'Participação no fórum',date:'Lembrete',body:'A discussão da próxima aula está aberta. Compartilhe suas reflexões e dialogue com os colegas.',type:'Lembrete'},
 {title:'Calendário da disciplina',date:'Informação geral',body:'Consulte regularmente a programação das aulas. Eventuais atualizações serão comunicadas neste espaço.',type:'Informação'}
];
let currentTopic=0,activeLesson=3;
const $=s=>document.querySelector(s);
function go(page){document.querySelectorAll('.page').forEach(x=>x.classList.add('hidden'));$('#page-'+page).classList.remove('hidden');document.querySelectorAll('.navbtn').forEach(b=>b.classList.toggle('active',b.dataset.page===page));const names={inicio:'Visão geral',aulas:'Aulas e calendário',materiais:'Materiais',avaliacoes:'Avaliações',forum:'Fórum de discussão',avisos:'Avisos','aula-detalhe':'Detalhes da aula'};$('#breadcrumb').textContent=names[page]||page;window.scrollTo({top:0,behavior:'smooth'});}
document.addEventListener('click',e=>{
 const nav=e.target.closest('[data-page]');if(nav){go(nav.dataset.page);return;}
 const jump=e.target.closest('[data-go]');if(jump){go(jump.dataset.go);return;}
 const cls=e.target.closest('[data-class]');if(cls){activeLesson=Number(cls.dataset.class);showLesson();return;}
 const topic=e.target.closest('[data-topic]');if(topic){currentTopic=Number(topic.dataset.topic);showTopic();return;}
 const filter=e.target.closest('[data-filter]');if(filter){document.querySelectorAll('[data-filter]').forEach(x=>x.classList.toggle('active',x===filter));renderClasses(filter.dataset.filter);return;}
 const mf=e.target.closest('[data-mfilter]');if(mf){document.querySelectorAll('[data-mfilter]').forEach(x=>x.classList.toggle('active',x===mf));renderMaterials(mf.dataset.mfilter);return;}
 const lt=e.target.closest('[data-ltab]');if(lt){document.querySelectorAll('[data-ltab]').forEach(x=>x.classList.toggle('active',x===lt));['overview','prep','forum'].forEach(x=>$('#lesson-'+x).classList.toggle('hidden',x!==lt.dataset.ltab));}
});
function renderClasses(f='all'){$('#class-list').innerHTML=lessons.filter(l=>f==='all'||(f==='done'?l.status==='done':l.status!=='done')).map(l=>`<div class="rowitem"><div class="lesson"><div class="datebox"><strong>${l.d.split(' ')[0]}</strong><small>${l.d.split(' ')[1]}</small></div><div class="lessontext"><strong>Aula ${String(l.n).padStart(2,'0')} · ${l.title}</strong><small>${l.desc}</small></div></div><div style="text-align:right"><span class="tag ${l.status==='done'?'green':l.status==='next'?'blue':''}">${l.status==='done'?'Realizada':l.status==='next'?'Próxima':'Programada'}</span><br><button class="textbtn" data-class="${l.n}">Detalhes →</button></div></div>`).join('');}
function showLesson(){const l=lessons.find(x=>x.n===activeLesson);go('aula-detalhe');$('#lesson-number').textContent='AULA '+String(l.n).padStart(2,'0')+' · '+l.d;$('#lesson-title').textContent=l.title;$('#lesson-description').textContent=l.desc;document.querySelectorAll('[data-ltab]').forEach((x,i)=>x.classList.toggle('active',i===0));['overview','prep','forum'].forEach((x,i)=>$('#lesson-'+x).classList.toggle('hidden',i!==0));}
function renderMaterials(f='all'){
 const groups=lessons.filter(l=>materials.some(m=>m.a===l.n&&(f==='all'||m.kind===f)));
 $('#material-list').innerHTML=groups.map(l=>{const items=materials.filter(m=>m.a===l.n&&(f==='all'||m.kind===f));const req=items.filter(m=>m.kind==='required'),extra=items.filter(m=>m.kind==='extra');const render=arr=>arr.length?arr.map(m=>`<div class="rowitem"><div class="lesson"><div class="materialicon">${m.type==='VÍDEO'?'▷':m.type==='PDF'?'▤':'▧'}</div><div class="lessontext"><strong>${m.t}</strong><small>${m.desc}</small><small>${m.type}</small></div></div><button class="textbtn" data-material="${m.a}">Consultar →</button></div>`).join(''):'<div class="empty">Nenhum material cadastrado nesta categoria.</div>';return `<article class="material-group"><div class="material-heading"><div class="eyebrow">AULA ${String(l.n).padStart(2,'0')} · ${l.d}</div><div class="lesson-title">${l.title}</div><p>${l.desc}</p></div><div class="material-body">${f!=='extra'?`<div class="material-type">MATERIAIS OBRIGATÓRIOS</div>${render(req)}`:''}${f!=='required'?`<div class="material-type">MATERIAIS COMPLEMENTARES</div>${render(extra)}`:''}</div></article>`;}).join('')||'<div class="card"><p>Nenhum material cadastrado nesta categoria.</p></div>';
}
document.addEventListener('click',e=>{if(e.target.closest('[data-material]'))alert('Adicione o link ou arquivo do material no arquivo script.js para disponibilizá-lo aos estudantes.');});
$('#assessment-list').innerHTML=assessments.map(a=>`<div class="rowitem"><div class="lesson"><div class="materialicon">✓</div><div class="lessontext"><strong>${a.n} · ${a.title}</strong><small>${a.desc}</small><small>Prazo: ${a.date}</small></div></div><span class="tag">${a.status}</span></div>`).join('');
function renderTopics(){$('#forum-list').innerHTML=topics.map((t,i)=>`<button class="discussion" data-topic="${i}"><strong>Aula ${String(t.a).padStart(2,'0')} · ${lessons[t.a-1].title}</strong><p>${t.q}</p><span class="tag">${t.c.length} comentário(s)</span></button>`).join('');}
function showTopic(){const t=topics[currentTopic];$('#forum-title').textContent='Aula '+String(t.a).padStart(2,'0')+' — '+lessons[t.a-1].title;$('#forum-question').textContent=t.q;$('#comments').innerHTML=t.c.map(c=>`<div class="comment"><strong>${escapeHtml(c.name||'Estudante')}</strong><br>${escapeHtml(c.text)}</div>`).join('')||'<p>Ainda não há comentários. Seja o primeiro a participar!</p>';}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
$('#post-comment').addEventListener('click',()=>{const text=$('#comment-text').value.trim();if(!text){$('#comment-feedback').textContent='Escreva sua contribuição antes de publicar.';return;}topics[currentTopic].c.push({name:$('#comment-name').value.trim(),text});$('#comment-text').value='';$('#comment-feedback').textContent='Comentário adicionado nesta demonstração local. Para compartilhar entre alunos, será necessário conectar um banco de dados.';showTopic();renderTopics();});
$('#notice-list').innerHTML=notices.map(n=>`<article class="card" style="margin:12px 0"><div style="display:flex;justify-content:space-between;gap:10px"><span class="tag blue">${n.type}</span><span class="muted">${n.date}</span></div><h3 style="margin-top:12px">${n.title}</h3><p>${n.body}</p></article>`).join('');
renderClasses();renderMaterials();renderTopics();showTopic();
