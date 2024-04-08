<script>
    import WelcomeMessage from './WelcomeMessage.svelte';
</script>

<div>
    <WelcomeMessage/>
    <div class='d-flex justify-content-start align-items-start flex-row gap-5'>
        <a
                class='card'
                href='https://docs.flagsmith.com/clients/next-ssr#example-ssr-without-nextjs'
                target='_blank'
                rel='noopener noreferrer'
        >
            <h2>
                Flagsmith Docs <span>-&gt;</span>
            </h2>
            <p class='fs-sm text-muted'>
                Find out how to use Flagsmith
                <br/> with Svelte
            </p>
        </a>
        <a
                class='card'
                href='https://svelte.dev/docs/introduction'
                target='_blank'
                rel='noopener noreferrer'
        >
            <h2>
                Svelte Docs <span>-&gt;</span>
            </h2>
            <p class='fs-sm text-muted'>
                Find in-depth information
                <br/>
                about Svelte features and API.
            </p>
        </a>
    </div>
</div>
