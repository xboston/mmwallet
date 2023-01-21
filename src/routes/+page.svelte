<script>
    import { invalidateAll } from '$app/navigation';

    /** @type {import('./$types').PageData} */
    export let data;

    function rerunLoadFunction() {
        invalidateAll();
    }
    // setInterval(() => {
    //     invalidateAll();
    // }, 5000);
</script>

<section id="preview">
    <h3>Статус системы, обновлено в: {data.now}</h3>
    <ul>
        <li>Блокчейна Solana: {@html data.statuses.statuses.solana.status ? '<strong style="color: lime">в порядке</strong>':'<strong style="color: lime">проблемы</strong>'}</li>
        <li>Поступление платежей: {@html data.statuses.statuses.payments.status ? '<strong style="color: lime">в порядке</strong>':'<strong style="color: red">проблемы</strong>'}</li>
        <li>Регистранция кошельков: {@html data.statuses.statuses.wallets.status ? '<strong style="color: lime">в порядке</strong>':'<strong style="color: red">проблемы</strong>'}</li>
    </ul>
</section>
<!-- <details>
    <summary style="opacity: 0.1;" >Как это работает</summary>
    <p>Lorem ipsum — классический текст-«рыба». Является искажённым отрывком из философского трактата Марка Туллия Цицерона «О пределах добра и зла», написанного в 45 году до н. э. на латинском языке, обнаружение сходства приписывается Ричарду Макклинтоку.</p>
</details> -->

<h3>Свежие платежи</h3>
<table role="grid">
    <thead>
        <tr>
        <th scope="col"></th>
        <th scope="col">signature</th>
        <th scope="col">amount</th>
        <th scope="col">time</th>
        </tr>
    </thead>
    <tbody>
        {#each data.latest as item, i}
        <tr>
            <th scope="row">{i+1}</th>
            <td> <a target="_blank" rel="noopener noreferrer" href="//solscan.io/tx/{item.signature}">{item.signature_short}</a></td>
            <td>${item.amount_usd}</td>
            <td>{item.time_local}</td>
        </tr>
        <tr>
        {/each}
    </tbody>
</table>
<!-- <details>
    <summary style="opacity: 0.1;" >Как это работает</summary>
    <p>Lorem ipsum — классический текст-«рыба». Является искажённым отрывком из философского трактата Марка Туллия Цицерона «О пределах добра и зла», написанного в 45 году до н. э. на латинском языке, обнаружение сходства приписывается Ричарду Макклинтоку.</p>
</details> -->


<button on:click={rerunLoadFunction}>Обновить данные</button>