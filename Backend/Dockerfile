# Base image
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

# SDK image
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["AirPandaAPI/AirPandaAPI.csproj", "AirPandaAPI/"]
RUN dotnet restore "YourProjectName/YourProjectName.csproj"
COPY . .
WORKDIR "/src/AirPandaAPI"
RUN dotnet build "AirPandaAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "AirPandaAPI.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AirPandaAPI.dll"]
