using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class ExiffData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1ce9fcb5-5d42-46a8-b181-438809182953");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6a0213bb-1b13-4f0a-9712-d21965657d57");

            migrationBuilder.AddColumn<DateTime>(
                name: "DateCapturted",
                table: "Images",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FileSize",
                table: "Images",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ImageDimensions",
                table: "Images",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "LenseType",
                table: "Images",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Make",
                table: "Images",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Model",
                table: "Images",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "48c9c357-6e9e-4fec-a0ea-1cf3b967d7e1", null, "User", "USER" },
                    { "5c2e05bc-bf45-4bfe-a940-d8be3b491129", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "48c9c357-6e9e-4fec-a0ea-1cf3b967d7e1");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5c2e05bc-bf45-4bfe-a940-d8be3b491129");

            migrationBuilder.DropColumn(
                name: "DateCapturted",
                table: "Images");

            migrationBuilder.DropColumn(
                name: "FileSize",
                table: "Images");

            migrationBuilder.DropColumn(
                name: "ImageDimensions",
                table: "Images");

            migrationBuilder.DropColumn(
                name: "LenseType",
                table: "Images");

            migrationBuilder.DropColumn(
                name: "Make",
                table: "Images");

            migrationBuilder.DropColumn(
                name: "Model",
                table: "Images");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1ce9fcb5-5d42-46a8-b181-438809182953", null, "User", "USER" },
                    { "6a0213bb-1b13-4f0a-9712-d21965657d57", null, "Admin", "ADMIN" }
                });
        }
    }
}
