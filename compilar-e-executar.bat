@echo off
title LocaSystem - TechDrive (Unidade 3)

echo ==============================================
echo   LOCASYSTEM - Compilacao e Execucao
echo   Disciplina: Programacao Orientada a Objetos
echo ==============================================
echo.

cd /d "%~dp0src\main\java"

echo [1/3] Compilando classes de entidades...
javac br\com\techdrive\locasystem\entidades\Veiculo.java
javac br\com\techdrive\locasystem\entidades\Carro.java
javac br\com\techdrive\locasystem\entidades\Moto.java

if errorlevel 1 (
    echo.
    echo ERRO na compilacao das entidades!
    pause
    exit /b 1
)

echo [2/3] Compilando classe Principal...
javac br\com\techdrive\locasystem\app\Principal.java

if errorlevel 1 (
    echo.
    echo ERRO na compilacao da classe Principal!
    pause
    exit /b 1
)

echo [3/3] Executando o programa...
echo.
java br.com.techdrive.locasystem.app.Principal

echo.
echo ==============================================
echo   Execucao finalizada.
echo ==============================================
pause
