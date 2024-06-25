using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class FullNameInColumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a8f0a1c3-2a9b-4f38-9d7a-292207b16e55");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "bc677823-bfd4-45fc-a6fb-2faa945deeb8");

            migrationBuilder.AddColumn<string>(
                name: "FullName",
                table: "Images",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "423b7255-a98a-4376-ab4b-69158b0c57c6", null, "Admin", "ADMIN" },
                    { "795a890e-1e39-4a36-b3c2-a0e8a5204da8", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "423b7255-a98a-4376-ab4b-69158b0c57c6");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "795a890e-1e39-4a36-b3c2-a0e8a5204da8");

            migrationBuilder.DropColumn(
                name: "FullName",
                table: "Images");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "a8f0a1c3-2a9b-4f38-9d7a-292207b16e55", null, "Admin", "ADMIN" },
                    { "bc677823-bfd4-45fc-a6fb-2faa945deeb8", null, "User", "USER" }
                });
        }
    }
}
