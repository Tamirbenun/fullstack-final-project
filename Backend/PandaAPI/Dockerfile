# Base image
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

# SDK image
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["PandaAPI.csproj", "."]
RUN dotnet restore "PandaAPI.csproj"
COPY . .
WORKDIR "/src/PandaAPI"
RUN dotnet build "PandaAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "PandaAPI.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "PandaAPI.dll"]
