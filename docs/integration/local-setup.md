# Forge UI — execução local

Execute os comandos sempre a partir dos lançadores na raiz: `forge.cmd` no Windows, `forge.command` no macOS e `./forge.sh` no Linux. O lançador sem argumentos instala o necessário e inicia o portal Next.js; nenhuma instalação deve ser feita manualmente dentro de `web/library` ou `showcase/portal`.

| Comando | Ação |
|---|---|
| `start` (padrão) | Verificar estrutura, instalar dependências ausentes na raiz e iniciar o showcase em localhost:3000 |
| `setup` | Verificar estrutura, instalar dependências e executar o typecheck |
| `doctor` | Verificação estrutural e diagnóstico sem download nem alteração de dependências |
| `check` | Verificação estrutural, typecheck e build |
| `build` | Build Next.js do showcase |
| `typecheck` | TypeScript do showcase |
| `clean` | Remover apenas artefatos locais gerados (node_modules, .next, out, dist e tsbuildinfo) |

Se o Node.js 22+ não estiver disponível, o lançador poderá obter uma distribuição oficial verificada por SHA-256 e instalá-la apenas em `.forge/tools/`, sem privilégios de administrador. Na primeira instalação é necessária rede para os downloads do Node (se aplicável) e do npm. `npm ci` será usado quando existir `package-lock.json`; sem lockfile será usado `npm install` para criar um. Problemas de rede, permissão ou integridade interrompem a execução com erro. Não há publicação GitHub ou NPM automática.

**Verificações realizadas neste sandbox (14/11/2026):** sintaxe de `forge.mjs` e dos lançadores Bash aprovada; `doctor` identifica workspaces e dependências ausentes. `npm install` retornou `EAI_AGAIN` ao acessar `registry.npmjs.org` neste ambiente. Typecheck e build completos continuam não verificados até instalar os pacotes com rede disponível. Windows e macOS não foram executados neste Linux.

## Windows PowerShell antigo (erro `Get-FileHash`)

O launcher `forge.cmd` usa `forge.ps1` e funciona com **Windows PowerShell 3 ou superior**, sem depender dos cmdlets `Get-FileHash` (PS4+) ou `Expand-Archive` (PS5+). O download oficial do Node.js 22.16.0 continua validado com SHA-256, calculado pelo .NET, e o ZIP e descompactado por `System.IO.Compression.ZipFile`. O launcher tambem habilita TLS 1.2 para downloads HTTPS mais antigos e nao pede privilegios administrativos.

Apos sincronizar os arquivos atualizados do Drive, na raiz do ForgeUI use `.\forge.cmd start` no terminal **cmd/PowerShell** (o comando literal no PowerShell e `./forge.cmd start` ou `.\forge.cmd start`). Para conferir a versao do interpretador, rode `$PSVersionTable.PSVersion` em um PowerShell. Se for anterior a 3, o instalador mostra o requisito.

Uma falha de rede no download oficial ou no npm ainda pode impedir o primeiro startup; nesse caso a mensagem deve ser tratada separadamente e o download sera retomado na nova execucao.

**Validacao desta correcao:** verificacao estrutural do workspace no Linux e inspecao do launcher; nao foi executado no Windows/PowerShell legado nem foi validado o build Next.js.
