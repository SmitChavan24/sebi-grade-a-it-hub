// Credentials stay in memory and are never written to the repository or logs.
const {execFileSync}=require('node:child_process');
const env={...process.env,GIT_TERMINAL_PROMPT:'0',GCM_INTERACTIVE:'never'};
async function main(){
  let token;
  try {
    const result=execFileSync('git',['credential','fill'],{input:'protocol=https\nhost=github.com\n\n',env,encoding:'utf8',timeout:15000,stdio:['pipe','pipe','pipe']});
    token=result.split('\n').find(x=>x.startsWith('password='))?.slice(9);
  } catch { console.log('GitHub authentication unavailable. Sign in to GitHub with Git Credential Manager, then retry.');process.exitCode=2;return; }
  if(!token) throw new Error('No stored GitHub credential');
  async function api(route,method='GET',body){
    const res=await fetch('https://api.github.com'+route,{method,headers:{Authorization:'Bearer '+token,Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28'},body:body?JSON.stringify(body):undefined});
    const data=await res.json().catch(()=>({}));
    if(!res.ok) {const e=new Error(`${method} ${route}: ${res.status} ${data.message||''}`);e.status=res.status;throw e;}return data;
  }
  const user=await api('/user'); const repo=user.login+'/SEBIPAPER';
  console.log('GitHub account: '+user.login);
  const command=process.argv[2]||'status';
  if(command==='status'){try{const r=await api('/repos/'+repo);console.log('Existing repository: '+r.html_url);}catch(e){if(e.status===404)console.log('SEBIPAPER repository does not exist yet.');else throw e;}return;}
  if(command==='create'){
    try{await api('/repos/'+repo);console.log('Using existing repository '+repo);}catch(e){if(e.status!==404)throw e;await api('/user/repos','POST',{name:'SEBIPAPER',description:'SEBI Grade A IT preparation: 180-day roadmap, lessons, books and progress tracker',private:false});console.log('Created '+repo);}
    console.log('Remote: https://github.com/'+repo+'.git');return;
  }
  if(command==='pages'){
    try{await api('/repos/'+repo+'/pages');await api('/repos/'+repo+'/pages','PUT',{build_type:'workflow'});}catch(e){if(e.status!==404)throw e;await api('/repos/'+repo+'/pages','POST',{build_type:'workflow'});}
    console.log('GitHub Pages configured for Actions.');return;
  }
  if(command==='runs'){
    const runs=await api('/repos/'+repo+'/actions/runs?per_page=3');
    console.log(JSON.stringify(runs.workflow_runs.map(r=>({id:r.id,status:r.status,conclusion:r.conclusion,url:r.html_url})),null,2));
    try{const p=await api('/repos/'+repo+'/pages');console.log('Site: '+p.html_url);}catch{}return;
  }
}
main().catch(e=>{console.error(e.message);process.exitCode=1;});
