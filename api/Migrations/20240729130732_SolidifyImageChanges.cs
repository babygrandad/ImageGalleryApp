using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class SolidifyImageChanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "48c9c357-6e9e-4fec-a0ea-1cf3b967d7e1");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5c2e05bc-bf45-4bfe-a940-d8be3b491129");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "6522ea58-e521-4e1b-805d-1ac68fcd0231", null, "User", "USER" },
                    { "6ff2ea5c-b364-4dad-9a3d-bfa82fd7ac3a", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6522ea58-e521-4e1b-805d-1ac68fcd0231");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6ff2ea5c-b364-4dad-9a3d-bfa82fd7ac3a");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "48c9c357-6e9e-4fec-a0ea-1cf3b967d7e1", null, "User", "USER" },
                    { "5c2e05bc-bf45-4bfe-a940-d8be3b491129", null, "Admin", "ADMIN" }
                });
        }
    }
}
