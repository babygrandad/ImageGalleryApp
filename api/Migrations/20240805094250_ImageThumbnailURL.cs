using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class ImageThumbnailURL : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2be0475a-215c-475e-8260-7dd23803f41f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "cc4b36d0-ecb9-4f76-a5b7-91326af3dba2");

            migrationBuilder.AlterColumn<DateTime>(
                name: "LastUpdated",
                table: "Images",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AddColumn<string>(
                name: "ImageThumbnailURL",
                table: "Images",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "51e9ec3a-c8b9-41fa-a609-3c55f31a62ee", null, "User", "USER" },
                    { "9ba4cc19-8ede-4c37-873d-0f7ee1024e72", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "51e9ec3a-c8b9-41fa-a609-3c55f31a62ee");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9ba4cc19-8ede-4c37-873d-0f7ee1024e72");

            migrationBuilder.DropColumn(
                name: "ImageThumbnailURL",
                table: "Images");

            migrationBuilder.AlterColumn<DateTime>(
                name: "LastUpdated",
                table: "Images",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2be0475a-215c-475e-8260-7dd23803f41f", null, "Admin", "ADMIN" },
                    { "cc4b36d0-ecb9-4f76-a5b7-91326af3dba2", null, "User", "USER" }
                });
        }
    }
}
