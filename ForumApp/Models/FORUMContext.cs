using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ForumApp.Models
{
    public partial class ForumContext : DbContext
    {
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<Topic> Topic { get; set; }
        public virtual DbSet<Comment> Comment { get; set; }


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(@"Server=(localdb)\LORANZATTO;Database=FORUM;User ID=loranzatto;Password=Wd2nalata;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity =>
            {
              entity.Property(e => e.Id)
                  .HasColumnName("id")
                  .HasMaxLength(15)
                  .IsUnicode(false)
                  .ValueGeneratedNever();

                entity.Property(e => e.CreationDate).HasColumnType("datetime");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("email")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(70)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("password")
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");
            });

            modelBuilder.Entity<Topic>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .IsUnicode(false)                             
                    .UseSqlServerIdentityColumn();

              entity.Property(e => e.CreationDate).HasColumnType("datetime");

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasColumnName("title")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasColumnName("description")
                    .HasMaxLength(70)
                    .IsUnicode(false);

                entity.Property(e => e.UserId)
                    .IsRequired()
                    .HasColumnName("userId")
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.UpdateDate).HasColumnType("datetime");
            });

            modelBuilder.Entity<Comment>(entity =>
            {
              entity.Property(e => e.Id)
                  .HasColumnName("id")
                  .IsUnicode(false)
                  .ValueGeneratedOnAdd()
                  .UseSqlServerIdentityColumn();

              entity.Property(e => e.CreationDate).HasColumnType("datetime");              

              entity.Property(e => e.Description)
                  .IsRequired()
                  .HasColumnName("description")
                  .HasMaxLength(1000)
                  .IsUnicode(false);

              entity.Property(e => e.TopicId)
                  .IsRequired()
                  .HasColumnName("topicId")
                  .IsUnicode(false);

              entity.Property(e => e.UserId)
                   .IsRequired()
                   .HasColumnName("userId")
                   .HasMaxLength(15)
                   .IsUnicode(false);

              entity.Property(e => e.UpdateDate).HasColumnType("datetime");
            });
    }
    }
}
