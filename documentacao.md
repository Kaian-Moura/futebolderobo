    # Documentação Completa - futebol de robô

    ## 📋 Índice
    1. [Visão Geral do Projeto](#visao-geral)
        1. [1.1 Características do Robô](#caracteristicas)
        2. [1.2 Arquitetura do Sistema](#arquitetura)
    2. [Lista de Materiais](#materiais)
        1. [2.1 Componentes Principais](#componentes-principais)
        2. [2.2 Componentes de Proteção e Fiação](#protecao-e-fiacao)
        3. [2.3 Chassi (opções)](#chassi)
    3. [Especificações Técnicas](#especificacoes)
        1. [3.1 Parâmetros dos Motores N20](#parametros-motores)
        2. [3.2 Cálculos de Desempenho](#calculos)
        3. [3.3 Consumo Elétrico](#consumo)
    4. [Diagrama de Circuito Elétrico](#circuito)
        1. [4.1 Esquema Completo de Ligações](#esquema)
        2. [4.2 Tabela de Conexões ESP32 ↔ TB6612](#tabela-conexoes)
        3. [4.3 Conexões de Potência](#conexoes-potencia)
    5. [Montagem Passo a Passo](#montagem)
        1. [5.1 Preparação do Chassi](#preparacao-chassi)
        2. [5.2 Montagem Mecânica](#montagem-mecanica)
        3. [5.3 Fiação de Potência](#fiacao-potencia)
        4. [5.4 Fiação de Sinais (ESP32 ↔ TB6612)](#fiacao-sinais)
        5. [5.5 Organização dos Cabos](#organizacao-cabos)
    6. [Configuração e Programação](#programacao)
        1. [6.1 Ambiente de Desenvolvimento](#ambiente)
        2. [6.2 Código Base - Teste de Motores](#codigo-base)
        3. [6.3 Ajustes de Calibração](#calibracao)
    7. [Testes e Comissionamento](#testes)
        1. [7.1 Checklist Pré-Energização](#checklist)
        2. [7.2 Sequência de Testes](#sequencia-testes)
    8. [Troubleshooting](#troubleshooting)

    ---

    ## 1. Visão Geral do Projeto {#visao-geral}

    ### 1.1 Características do Robô {#caracteristicas}
    - **Tipo:** 2WD (tração nas duas rodas traseiras)
    - **Velocidade:** ~23 cm/s
    - **Massa estimada:** 450g (com folgas)
    - **Autonomia:** 1-1.3h de uso contínuo
    - **Tensão de operação:** 7.4V (bateria) / 5.1V (lógica)

    ### 1.2 Arquitetura do Sistema {#arquitetura}
    ```
    ┌─────────────────────────────────────────────┐
    │           BATERIA LiPo 2S (7.4V)            │
    └──────────┬────────────────────┬─────────────┘
                │                    │
            [FUSÍVEL 5A]         [CHAVE]
                │                    │
                ├────────────────────┴──────┐
                │                           │
                │                    ┌──────▼──────┐
                │                    │ Buck 5.1V   │
                │                    │  MP1584     │
                │                    └──────┬──────┘
                │                           │
                │                    ┌──────┴──────┐
            ┌────▼────┐              │             │
            │ TB6612  │◄─────────────┤   ESP32     │
            │ (VM)    │   Controle   │  DevKit     │
            │         │              └─────────────┘
            └─┬───┬───┘
            │   │
        Motor A Motor B
    ```

    ---

    ## 2. Lista de Materiais {#materiais}

    ### 2.1 Componentes Principais {#componentes-principais}

    | # | Item | Especificação | Qtd | Link de Compra |
    |---|------|---------------|-----|----------------|
    | 1 | Micromotor N20 | 12V 100RPM metal-gear | 2 | [Mercado Livre](https://www.mercadolivre.com.br/motor-n20-12v-100rpm-eficiencia-durabilidade-micro-motor-dc/up/MLBU1737130650?pdp_filters=item_id%3AMLB3607127009#origin%3Dshare%26sid%3Dshare%26wid%3DMLB3607127009) |
    | 2 | Rodas | 44×18mm, furo D 3mm | 1 par (4 rodas) | [Mercado Livre](https://www.mercadolivre.com.br/2-pares-de-rodas-para-robo-eixo-tipo-d-3mm-motor-n20/up/MLBU1435238327) |
    | 3 | Driver TB6612FNG | Dupla ponte H | 1 | [Fornell](https://www.fornell.com.br/produtos/modulo-tb6612fng-duplo-ponte-h/?variant=1168128256&pf=mc) |
    | 4 | ESP32-WROOM | DevKit 30 pinos | 1 | (Já temos) |
    | 5 | Bateria LiPo 2S | 7.4V 1100mAh 20/40C | 1 | [Suprimentos Oliveira](https://www.suprimentosoliveira.com.br/bateria-lipo-ultra-74v-1100mah-2s-airsoft-leo-mini-tamiya/p/MLB27567505) |
    | 6 | Buck Converter | MP1584/LM2596 3A | 1 | [Mercado Livre](https://www.mercadolivre.com.br/conversor-dcdc-step-down-lm2596-3a-ultra-small-smd-mp1584/up/MLBU1430173197?pdp_filters=item_id%3AMLB2697928475#origin%3Dshare%26sid%3Dshare%26wid%3DMLB2697928475) |
    | 7 | Rodízio/Caster | 15-20mm diâmetro | 1 | [Mercado Livre](https://www.mercadolivre.com.br/10x-suportes-plasticos-c-parafuso-p-fixacao-de-motor-n20-n30/up/MLBU2129308786?pdp_filters=item_id%3AMLB3872338809#origin%3Dshare%26sid%3Dshare%26wid%3DMLB3872338809) |
    | 8 | Suporte N20 | Metal ou plástico | 2 | [Mercado Livre](https://www.mercadolivre.com.br/10x-suportes-plasticos-c-parafuso-p-fixacao-de-motor-n20-n30/up/MLBU2129308786?pdp_filters=item_id%3AMLB3872338809#origin%3Dshare%26sid%3Dshare%26wid%3DMLB3872338809)  |

    ### 2.2 Componentes de Proteção e Fiação {#protecao-e-fiacao}

    | # | Item | Especificação | Qtd | Criticidade |
    |---|------|---------------|-----|-------------|
    | 9 | Capacitor eletrolítico | 470-1000µF / 16V | 1 | **Importante** |
    | 10 | Fusível | 5-7.5A com porta-fusível | 1 | **Importante** |
    | 11 | Chave liga/desliga | 10A, 12-24V | 1 | Recomendado |
    | 12 | Fios 20-22 AWG | Vermelho/preto | 2m | Potência |
    | 13 | Fios 26-28 AWG | Coloridos | 2m | Sinais |
    | 14 | Adaptador mini-Tamiya | Para bateria | 1 | Conforme sistema |
    | 15 | Parafusos M3 | 10-15mm | 20 | Fixação geral |
    | 16 | Espaçadores M3 | 10-15mm | 8 | Montagem chassi |

    ### 2.3 Chassi (opções) {#chassi}
    - Acrílico 3mm cortado a laser (recomendado)
    - MDF 3mm
    - Impressão 3D (PLA/PETG)

    **Dimensões sugeridas:** 12cm × 10cm (plataforma principal)

    ---

    ## 3. Especificações Técnicas {#especificacoes}

    ### 3.1 Parâmetros dos Motores N20 {#parametros-motores}
    ```
    Tensão nominal:        12V
    Velocidade:            100 RPM (±10%)
    Corrente sem carga:    60-120 mA
    Corrente em carga:     100-250 mA
    Corrente de stall:     1.0-1.6 A (pico)
    Torque estimado:       ~0.15 kg·cm (em 12V)
    Redução:               Metal gear (precisão)
    ```

    ### 3.2 Cálculos de Desempenho {#calculos}

    #### Velocidade Linear
    ```
    Diâmetro da roda:  44 mm
    Raio (r):          22 mm = 0.022 m
    RPM do motor:      100
    RPS (rotações/s):  100/60 = 1.667 rps

    Velocidade = 2π × r × RPS
    v = 2 × 3.1416 × 0.022 × 1.667
    v ≈ 0.23 m/s = 23 cm/s
    ```

    #### Torque Necessário (por roda)
    Para massa de 0.45 kg, aceleração 0.5 m/s², 2 rodas trativas:
    ```
    Força por roda = (m × a × 1.5) / 2
    F = (0.45 × 0.5 × 1.5) / 2 = 0.169 N

    Torque = F × r
    τ = 0.169 × 0.022 = 0.0037 N·m
    τ ≈ 0.038 kg·cm

    ✓ Motores N20 100RPM fornecem ~0.15 kg·cm (4× margem)
    ```

    ### 3.3 Consumo Elétrico {#consumo}

    | Componente | Corrente Típica | Corrente Pico |
    |------------|----------------|---------------|
    | ESP32 (ativo) | 160-260 mA | 500 mA |
    | Motor N20 (×2 cruzeiro) | 200-500 mA | 3.2 A |
    | Driver TB6612 (quiescente) | 2 mA | - |
    | **TOTAL** | **0.8-1.0 A** | **~3 A** |

    **Autonomia estimada:** 
    - Bateria 1100mAh ÷ 1000mA = 1.1h contínuo
    - Real (uso intermitente): 1.5-2h

    ---

    ## 4. Diagrama de Circuito Elétrico {#circuito}

    ### 4.1 Esquema Completo de Ligações {#esquema}

    ```
            ┌─────────────────────────────────────────┐
            │    BATERIA LiPo 2S (7.4V 1100mAh)       │
            │         [+]              [-]            │
            └──────────┬───────────────┬──────────────┘
                            │               │
                    [FUSÍVEL 5A]          │
                            │               │
                    [CHAVE ON/OFF]        │
                            │               │
                            ├───────────────┴─────────────┐
                            │                             │
                            │                          [GND COMUM]
                            │                             │
            ┌──────────▼──────────┐                  │
            │   BUCK MP1584       │                  │
            │   VIN(+)  GND(-)    │                  │
            │   VOUT    GND       │                  │
            │   [Ajustar 5.1V]    │                  │
            └──────────┬──────────┘                  │
                            │                             │
                ┌─────────┴──────┬──────────────────────┤
                │                │                      │
                │          ┌─────▼─────┐                │
                │          │  ESP32    │                │
                │          │  DevKit   │                │
                │          │           │                │
                │          │  VIN  GND │◄───────────────┤
                │          │           │                │
                │          │  GPIO's   │                │
                │          └─────┬─────┘                │
                │                │(sinais controle)     │
                │                │                      │
        ┌────▼────┐    ┌──────▼──────┐              │
        │ CAP     │    │  TB6612FNG  │              │
        │470-1000µF    │             │              │
        │         │    │ VCC ◄───────┼──────────────┘
        │         │    │ VM  ◄───────┼──[7.4V direto bateria]
        │   +  -  │    │ GND ────────┼──[GND comum]
        └────┬────┘    │             │
                │         │ STBY◄GPIO12 │
                │         │ AIN1◄GPIO26 │
                └─────────┤ AIN2◄GPIO27 │
                            │ PWMA◄GPIO25 │
                            │ BIN1◄GPIO32 │
                            │ BIN2◄GPIO14 │
                            │ PWMB◄GPIO33 │
                            │             │
                            │ AO1   AO2   │
                            │  │     │    │
                            │  └─────┴────┼──► MOTOR A (Esquerdo)
                            │             │
                            │ BO1   BO2   │
                            │  │     │    │
                            │  └─────┴────┼──► MOTOR B (Direito)
                            └─────────────┘
    ```

    ### 4.2 Tabela de Conexões ESP32 ↔ TB6612 {#tabela-conexoes}

    | Pino ESP32 | Função | Pino TB6612 | Descrição |
    |------------|--------|-------------|-----------|
    | GPIO 12 | OUTPUT | STBY | Standby (HIGH=ativo) |
    | GPIO 26 | OUTPUT | AIN1 | Motor A - Direção 1 |
    | GPIO 27 | OUTPUT | AIN2 | Motor A - Direção 2 |
    | GPIO 25 | PWM | PWMA | Motor A - Velocidade |
    | GPIO 32 | OUTPUT | BIN1 | Motor B - Direção 1 |
    | GPIO 14 | OUTPUT | BIN2 | Motor B - Direção 2 |
    | GPIO 33 | PWM | PWMB | Motor B - Velocidade |
    | GND | GND | GND | Terra comum |
    | - | 5.1V (via buck) | VCC | Alimentação lógica |

    ### 4.3 Conexões de Potência {#conexoes-potencia}

    ```
    TB6612FNG:
    - VCC: 5.1V (do buck) → alimenta lógica interna
    - VM:  7.4V (bateria direto) → alimenta motores
    - GND: comum com ESP32, buck e bateria

    CAPACITOR:
    - 470-1000µF entre VM (+7.4V) e GND
    - Posicionar próximo ao TB6612 (< 5cm)
    - Polaridade: perna longa no +VM

    FUSÍVEL:
    - 5A no fio positivo da bateria
    - Antes da chave liga/desliga
    ```

    ---

    ## 5. Montagem Passo a Passo {#montagem}

    ### 5.1 Preparação do Chassi {#preparacao-chassi}

    **Materiais necessários:**
    - Placa de acrílico 3mm (12×10 cm)
    - Furadeira com broca 3mm
    - Régua e marcador
    - Lixa fina

    **Procedimento:**

    1. **Marcar furos dos suportes N20:**
        - Distância entre rodas: 8-9 cm
        - Posicionar 2cm da borda traseira
        - Marcar 4 furos por suporte (espaçamento conforme suporte)

    2. **Furos para componentes eletrônicos:**
        ```
        Vista superior do chassi (12×10 cm):
        
        ┌─────────────────────────────┐
        │  [Caster]                   │ ← Frontal
        │      ○                      │
        │                             │
        │  [ESP32]    [Buck]          │
        │   ○ ○       ○ ○             │
        │                             │
        │  [TB6612]  [Bateria]        │
        │   ○ ○       (velcro)        │
        │                             │
        │ [Motor]         [Motor]     │
        │   ○ ○             ○ ○       │
        └─────────────────────────────┘
        ```

    3. **Furar e lixar:**
        - Furar todos os pontos marcados
        - Lixar bordas e rebarbas
        - Limpar com pano seco

    ### 5.2 Montagem Mecânica {#montagem-mecanica}

    **Etapa 1: Instalar Motores N20**
    ```
    1. Posicionar suportes na parte traseira do chassi
    2. Fixar com parafusos M3 × 10mm
    3. Inserir motores N20 nos suportes
    4. Apertar parafusos de fixação dos motores
    5. Verificar alinhamento (motores paralelos)
    6. Encaixar rodas nos eixos tipo D
        → Alinhar parte plana do eixo com furo D
        → Apertar parafuso de fixação da roda
    ```

    **Etapa 2: Instalar Rodízio/Caster**
    ```
    1. Posicionar na parte frontal (ou traseira, se preferir)
    2. Fixar com 2-4 parafusos M3
    3. Verificar giro livre 360°
    ```

    **Etapa 3: Fixar Componentes Eletrônicos**
    ```
    Usar espaçadores M3 de 10mm:

    ESP32:
    - 4 espaçadores nos furos do PCB
    - Elevar para ventilação
    - Posição central-frontal

    TB6612:
    - 2 espaçadores (se PCB tiver furos)
    - Ou fita dupla-face (última opção)
    - Próximo aos motores

    Buck MP1584:
    - 2 espaçadores ou fita dupla-face
    - Acesso ao potenciômetro de ajuste
    - Longe de metal (evitar curto)

    Bateria:
    - Velcro industrial forte
    - Posição central-traseira
    - Fácil acesso para troca
    ```

    ### 5.3 Fiação de Potência {#fiacao-potencia}

    **Passo 1: Preparar Fios**
    ```
    Cortar e descascar:
    - 2× fios vermelhos 20 AWG: 15cm (VM do TB6612)
    - 2× fios pretos 20 AWG: 15cm (GND)
    - 2× fios vermelhos 22 AWG: 10cm (buck → VCC)
    - 4× fios coloridos 26 AWG: 8cm (motores)
    ```

    **Passo 2: Soldar Fusível e Chave**
    ```
    Bateria (+) → Fusível → Chave → [Linha principal +7.4V]
    Bateria (-) → [GND comum direto]
    ```

    **Passo 3: Conectar Buck**
    ```
    Buck VIN(+) ← Linha principal +7.4V
    Buck GND(-) ← GND comum
    Buck VOUT → [Ainda não conectar nada]
    ```

    **Passo 4: Ajustar Buck para 5.1V**
    ```
    1. Conectar apenas bateria ao buck (nada na saída)
    2. Ligar chave
    3. Medir VOUT com multímetro
    4. Girar potenciômetro até ler 5.1V ± 0.1V
    5. Desligar chave
    6. Desconectar bateria
    ```

    **Passo 5: Conectar TB6612 (Potência)**
    ```
    TB6612 VM(+) ← Linha principal +7.4V (bateria)
    TB6612 VCC  ← Buck VOUT (5.1V)
    TB6612 GND  ← GND comum
    ```

    **Passo 6: Instalar Capacitor**
    ```
    Capacitor 470-1000µF:
    - Perna longa (+) → VM do TB6612
    - Perna curta (-) → GND comum
    - Soldar ou usar terminal de parafuso
    - Posição: < 5cm do TB6612
    ```

    **Passo 7: Conectar Motores**
    ```
    Motor A (Esquerdo):
    - Fio 1 → TB6612 AO1
    - Fio 2 → TB6612 AO2

    Motor B (Direito):
    - Fio 1 → TB6612 BO1
    - Fio 2 → TB6612 BO2

    Nota: Polaridade será ajustada no código
    ```

    ### 5.4 Fiação de Sinais (ESP32 ↔ TB6612) {#fiacao-sinais}

    **Usar fios 26-28 AWG coloridos:**

    | Cor Sugerida | ESP32 GPIO | TB6612 Pino |
    |--------------|------------|-------------|
    | Laranja | 12 | STBY |
    | Amarelo | 26 | AIN1 |
    | Verde | 27 | AIN2 |
    | Azul | 25 | PWMA |
    | Roxo | 32 | BIN1 |
    | Marrom | 14 | BIN2 |
    | Cinza | 33 | PWMB |

    **Conexão GND:**
    - ESP32 GND → TB6612 GND (fio grosso, curto)

    **Alimentação ESP32:**
    ```
    Buck VOUT (5.1V) → ESP32 VIN
    GND comum → ESP32 GND
    ```

    ### 5.5 Organização dos Cabos {#organizacao-cabos}

    ```
    1. Agrupar cabos de potência separados dos sinais
    2. Usar abraçadeiras ou espiral organizadora
    3. Deixar folga para manutenção
    4. Evitar cabos sobre componentes quentes
    5. Fixar com cola quente (pontos estratégicos)
    ```

    ---

    ## 6. Configuração e Programação {#programacao}

    ### 6.1 Ambiente de Desenvolvimento {#ambiente}

    **Instalar Arduino IDE:**
    1. Download: https://www.arduino.cc/en/software
    2. Instalar suporte ESP32:
        - File → Preferences
        - Additional Board URLs: 
        `https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json`
        - Tools → Board → Boards Manager
        - Pesquisar "ESP32" → Install

    **Configurar placa:**
    ```
    Tools → Board → ESP32 Arduino → ESP32 Dev Module
    Tools → Upload Speed → 115200
    Tools → Flash Frequency → 80MHz
    Tools → Port → [Selecionar porta COM do ESP32]
    ```

    ### 6.2 Código Base - Teste de Motores {#codigo-base}

    ```cpp
    // ====================================
    // Robô Futebol 2WD - Código Base
    // ====================================

    // Definição de pinos TB6612
    #define STBY 12

    // Motor A (Esquerdo)
    #define AIN1 26
    #define AIN2 27
    #define PWMA 25

    // Motor B (Direito)
    #define BIN1 32
    #define BIN2 14
    #define PWMB 33

    // Configurações PWM
    #define PWM_FREQ 5000
    #define PWM_RES 8  // 0-255
    #define PWM_CHANNEL_A 0
    #define PWM_CHANNEL_B 1

    // Limites de segurança
    #define MAX_SPEED 220  // De 0-255
    #define RAMP_STEP 5    // Incremento na rampa
    #define RAMP_DELAY 10  // ms entre incrementos

    void setup() {
    Serial.begin(115200);
    Serial.println("Iniciando Robô Futebol 2WD...");
    
    // Configurar pinos de controle
    pinMode(STBY, OUTPUT);
    pinMode(AIN1, OUTPUT);
    pinMode(AIN2, OUTPUT);
    pinMode(BIN1, OUTPUT);
    pinMode(BIN2, OUTPUT);
    
    // Configurar PWM
    ledcSetup(PWM_CHANNEL_A, PWM_FREQ, PWM_RES);
    ledcSetup(PWM_CHANNEL_B, PWM_FREQ, PWM_RES);
    ledcAttachPin(PWMA, PWM_CHANNEL_A);
    ledcAttachPin(PWMB, PWM_CHANNEL_B);
    
    // Ativar driver
    digitalWrite(STBY, HIGH);
    
    Serial.println("Sistema pronto!");
    delay(1000);
    }

    void loop() {
    // Teste de movimentos
    Serial.println("Frente...");
    moverFrente(150);
    delay(2000);
    
    Serial.println("Parar...");
    parar();
    delay(1000);
    
    Serial.println("Ré...");
    moverRe(150);
    delay(2000);
    
    Serial.println("Parar...");
    parar();
    delay(1000);
    
    Serial.println("Girar direita...");
    girarDireita(120);
    delay(1000);
    
    Serial.println("Parar...");
    parar();
    delay(1000);
    
    Serial.println("Girar esquerda...");
    girarEsquerda(120);
    delay(1000);
    
    parar();
    delay(3000);
    }

    // ====================================
    // Funções de Controle dos Motores
    // ====================================

    void moverFrente(int velocidade) {
    velocidade = constrain(velocidade, 0, MAX_SPEED);
    acelerarMotores(velocidade, velocidade, true, true);
    }

    void moverRe(int velocidade) {
    velocidade = constrain(velocidade, 0, MAX_SPEED);
    acelerarMotores(velocidade, velocidade, false, false);
    }

    void girarDireita(int velocidade) {
    velocidade = constrain(velocidade, 0, MAX_SPEED);
    // Motor esquerdo frente, direito ré
    acelerarMotores(velocidade, velocidade, true, false);
    }

    void girarEsquerda(int velocidade) {
    velocidade = constrain(velocidade, 0, MAX_SPEED);
    // Motor esquerdo ré, direito frente
    acelerarMotores(velocidade, velocidade, false, true);
    }

    void parar() {
    // Desacelerar suavemente
    int velocAtual = ledcRead(PWM_CHANNEL_A);
    for(int v = velocAtual; v >= 0; v -= RAMP_STEP) {
        ledcWrite(PWM_CHANNEL_A, v);
        ledcWrite(PWM_CHANNEL_B, v);
        delay(RAMP_DELAY);
    }
    
    // Freio
    digitalWrite(AIN1, LOW);
    digitalWrite(AIN2, LOW);
    digitalWrite(BIN1, LOW);
    digitalWrite(BIN2, LOW);
    ledcWrite(PWM_CHANNEL_A, 0);
    ledcWrite(PWM_CHANNEL_B, 0);
    }

    void acelerarMotores(int velocA, int velocB, bool frenteA, bool frenteB) {
    // Configurar direções
    if(frenteA) {
        digitalWrite(AIN1, HIGH);
        digitalWrite(AIN2, LOW);
    } else {
        digitalWrite(AIN1, LOW);
        digitalWrite(AIN2, HIGH);
    }
    
    if(frenteB) {
        digitalWrite(BIN1, HIGH);
        digitalWrite(BIN2, LOW);
    } else {
        digitalWrite(BIN1, LOW);
        digitalWrite(BIN2, HIGH);
    }
    
    // Rampa de aceleração
    int velocAtualA = ledcRead(PWM_CHANNEL_A);
    int velocAtualB = ledcRead(PWM_CHANNEL_B);
    
    while(velocAtualA < velocA || velocAtualB < velocB) {
        if(velocAtualA < velocA) {
            velocAtualA = min(velocAtualA + RAMP_STEP, velocA);
            ledcWrite(PWM_CHANNEL_A, velocAtualA);
        }
        if(velocAtualB < velocB) {
            velocAtualB = min(velocAtualB + RAMP_STEP, velocB);
            ledcWrite(PWM_CHANNEL_B, velocAtualB);
        }
        delay(RAMP_DELAY);
    }
    }

    // Função auxiliar para setar motor individual
    void setMotor(int motor, int velocidade, bool frente) {
    velocidade = constrain(velocidade, 0, MAX_SPEED);
    
    if(motor == 0) { // Motor A
        digitalWrite(AIN1, frente ? HIGH : LOW);
        digitalWrite(AIN2, frente ? LOW : HIGH);
        ledcWrite(PWM_CHANNEL_A, velocidade);
    } else { // Motor B
        digitalWrite(BIN1, frente ? HIGH : LOW);
        digitalWrite(BIN2, frente ? LOW : HIGH);
        ledcWrite(PWM_CHANNEL_B, velocidade);
    }
    }
    ```

    ### 6.3 Ajustes de Calibração {#calibracao}

    **Se um motor girar ao contrário:**
    ```cpp
    // Inverter lógica no código:
    // Motor A:
    digitalWrite(AIN1, LOW);  // Trocar HIGH ↔ LOW
    digitalWrite(AIN2, HIGH); // aqui também

    // Ou inverter fisicamente os fios AO1 ↔ AO2
    ```

    **Compensação de diferença entre motores:**
    ```cpp
    // Se robô desvia para um lado:
    #define MOTOR_A_OFFSET 1.0   // Multiplicador
    #define MOTOR_B_OFFSET 0.95  // Ex: motor B 5% mais lento

    velocA = velocA * MOTOR_A_OFFSET;
    velocB = velocB * MOTOR_B_OFFSET;
    ```

    ---

    ## 7. Testes e Comissionamento {#testes}

    ### 7.1 Checklist Pré-Energização {#checklist}

    ```
    □ Todas as soldas firmes (puxar levemente)
    □ Sem curtos-circuitos (multímetro em modo continuidade)
    - Medir entre +7.4V e GND (deve ser ∞)
    - Medir entre +5.1V e GND (deve ser ∞)
    □ Polaridade da bateria correta (vermelho +, preto -)
    □ Capacitor com polaridade correta
    □ Buck ajustado para 5.1V ± 0.1V
    □ Fusível instalado
    □ Rodas giram livremente (sem atrito)
    □ Motores fixos nos suportes
    ```

    ### 7.2 Sequência de Testes {#sequencia-testes}

    **Teste 1: Buck Converter**
    ```
    1. Conectar apenas bateria ao buck
    2. Ligar chave
    3. Medir VOUT → deve ser 5.1V
    4. Se OK, desligar e prosseguir
    ```

    **Teste 2: ESP32 Sozinho**
    ```
    1. Conectar buck ao ESP32 (VIN/GND)
    2. Conectar USB ao computador
    3. Fazer upload do código de teste
    4. Verificar mensagens no Serial Monitor
    5. Desconectar USB
    6. Ligar bateria via chave
    7. ESP32 deve ligar (LED azul na placa)
    ```

    **Teste 3: TB6612 sem Motores**
    ```
    1. Conectar ESP32 ↔ TB6612 (sinais)
    2. Conectar alimentação do TB6612
    3. Não conectar motores ainda
    4. Fazer upload de código que liga/desliga pinos
    5. Medir tensão em AO1/AO2 (deve chavear 0V ↔ 7.4V)
    ```

    **Teste 4: Um Motor por Vez**
    ```
    1. Conectar apenas Motor A
    2. Suspender robô (rodas no ar)
    3. Upload código básico
    4. Verificar:
        - Gira na direção correta (frente/ré)
        - Sem ruídos estranhos
        - TB6612 não aquece muito (tocar com dedo)
    5. Repetir para Motor B
    ```

    **Teste 5: Ambos Motores Suspenso**
    ```
    1. Conectar ambos motores
    2. Suspender robô
    3. Testar sequência completa:
        - Frente
        - Ré
        - Giro direita
        - Giro esquerda
        - Parar
    4. Observar se rodam sincronizados
    ```

    ---

    ## 8. Troubleshooting {#troubleshooting}

    - Problema: Motor não gira — Verificar fusível, alimentação VM, conexões AOx/BOx e STBY.
    - Problema: ESP32 não liga — Verificar buck VOUT (5.1V), GND comum e cabo VIN.
    - Problema: Robô puxa para um lado — Calibrar offsets de velocidade ou inverter polaridade do motor correto.
    - Dica: Teste cada etapa isoladamente (somente buck, depois ESP32, depois TB6612 sem motores, etc.).
