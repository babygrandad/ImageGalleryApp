using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class AddDeleteColumnToImageModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "05e972f3-2177-462d-a6cd-e8c7bb6d4cdb");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "cc28ede0-1b2f-435f-8540-a860c0b363fc");

            migrationBuilder.AddColumn<string>(
                name: "ImageDeleteURL",
                table: "Images",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2be0475a-215c-475e-8260-7dd23803f41f", null, "Admin", "ADMIN" },
                    { "cc4b36d0-ecb9-4f76-a5b7-91326af3dba2", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2be0475a-215c-475e-8260-7dd23803f41f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "cc4b36d0-ecb9-4f76-a5b7-91326af3dba2");

            migrationBuilder.DropColumn(
                name: "ImageDeleteURL",
                table: "Images");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "05e972f3-2177-462d-a6cd-e8c7bb6d4cdb", null, "Admin", "ADMIN" },
                    { "cc28ede0-1b2f-435f-8540-a860c0b363fc", null, "User", "USER" }
                });
        }
    }
}
