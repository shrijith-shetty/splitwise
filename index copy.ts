import {}


const run = async () => {
  const {ask , choose, close} = openInterreactionManger();
  const answer = await ask('What is your name?');
  console.log(`Hello , %{answer}`);
  
}