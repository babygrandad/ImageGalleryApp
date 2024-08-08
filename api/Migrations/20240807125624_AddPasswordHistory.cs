using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class AddPasswordHistory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "51e9ec3a-c8b9-41fa-a609-3c55f31a62ee");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9ba4cc19-8ede-4c37-873d-0f7ee1024e72");

            migrationBuilder.CreateTable(
                name: "PasswordHistories",
                columns: table => new
                {
                    PasswordID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    HashedPassword = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ChangedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PasswordHistories", x => x.PasswordID);
                    table.ForeignKey(
                        name: "FK_PasswordHistories_AspNetUsers_UserID",
                        column: x => x.UserID,
                        principalTable: "AspNetUsers",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "35f5fa39-c161-4c9f-bef3-e251c472373d", null, "Admin", "ADMIN" },
                    { "b299378c-58e4-4c2d-af45-e5591fb400ff", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_PasswordHistories_UserID",
                table: "PasswordHistories",
                column: "UserID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PasswordHistories");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "35f5fa39-c161-4c9f-bef3-e251c472373d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b299378c-58e4-4c2d-af45-e5591fb400ff");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "51e9ec3a-c8b9-41fa-a609-3c55f31a62ee", null, "User", "USER" },
                    { "9ba4cc19-8ede-4c37-873d-0f7ee1024e72", null, "Admin", "ADMIN" }
                });
        }
    }
}
