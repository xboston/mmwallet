<script>
    /** @type {import('./$types').PageData} */
    export let data;
</script>

<h4>Свежие регистрации</h4>
<table role="grid">
    <thead>
        <tr>
        <th scope="col"></th>
        <th scope="col">signature</th>
        <th scope="col">plan</th>
        <th scope="col">amount</th>
        <th scope="col">time</th>
        </tr>
    </thead>
    <tbody>
        {#each data.latest.wallets.data as item, i}
        <tr>
            <th scope="row">{i+1}</th>
            <td> <a target="_blank" rel="noopener noreferrer" href="//solscan.io/tx/{item.signature}">{item.signature_short}</a></td>
            <td>{item.plan}</td>
            <td>${item.amount_usd}</td>
            <td>{new Date(item.time).toLocaleString()}</td>
        </tr>
        <tr>
        {/each}
    </tbody>
</table>
