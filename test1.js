const{getlRange} =require('./mid/redis')


key="game:taskIDList1";
async function aa() {
    const b = await getlRange(key,0,-1)
    console.log(b[0])
}
aa()